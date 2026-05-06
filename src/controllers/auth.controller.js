import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/configs.js";
import sessionModel from "../models/session.model.js";
import crypto from "crypto";

// Register a new user
export const register = async (req, res) => {

    const { username, email, password } = req.body;


    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (isUserAlreadyExist) {
        return res.status(409).json({ success: false, message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hashpassword
    });

    const refreshToken = jwt.sign(
        {
            userId: user._id,
        },
        config.JWT_SECRET,
        { expiresIn: "7d" }
    );

    // hash reftoken before storing in database
    const hashedRefreshToken = await crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await sessionModel.create({
        userId: user._id,
        refreshToken: hashedRefreshToken,
        ip: req.ip,
        userAgent: req.headers["user-agent"],
    });

    const accessToken = jwt.sign(
        {
            userId: user._id,
            sessionId: session._id,
        },
        config.JWT_SECRET,
        { expiresIn: "15m" }
    );

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        accessToken,
        User: {
            id: user._id,
            email: user.email,
            username: user.username,
        }
    });
}


//  refresh token
export const refreshToken = async (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token Found!!" });
    }

    const hashedRefreshToken = await crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await sessionModel.findOne({
        refreshToken: hashedRefreshToken,
        revoked: false,
    });

    if (!session) {
        return res.status(401).json({ message: "Invalid refresh token" });
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

    const accessToken = jwt.sign(
        {
            userId: decoded.userId,
            sessionId: session._id,
        },
        config.JWT_SECRET,
        { expiresIn: "15m" }
    );

    const newRefreshToken = jwt.sign(
        {
            userId: decoded.userId,
        },
        config.JWT_SECRET,
        { expiresIn: "7d" }
    )

    const newHashedRefreshToken = await crypto.createHash("sha256").update(newRefreshToken).digest("hex");

    session.refreshToken = newHashedRefreshToken;
    await session.save();

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
        success: true,
        message: "Access token refreshed successfully",
        accessToken,
    });
}


// Getme
export const getMe = async (req, res) => {

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);

        const session = await sessionModel.findOne({
            _id: decoded.sessionId,
            UserId: decoded.userId,
            revoked: false,
        });

        if (!session) {
            return res.status(401).json({ message: "Session expired or logged out" });
        }

        const user = await userModel.findById(decoded.userId);
        res.status(200).json({
            success: true,
            message: "User authenticated successfully",
            User: {
                email: user.email,
                username: user.username,
            }
        });

    } catch (error) {
        return res.status(401).json({ message: error.message });
    }




}


// logout user
export const logout = async (req, res) => {

    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({ message: "No refresh token found" });
        }

        jwt.verify(refreshToken, config.JWT_SECRET);

        const hashedRefreshToken = await crypto.createHash("sha256").update(refreshToken).digest("hex");

        const session = await sessionModel.findOne({
            refreshToken: hashedRefreshToken,
            revoked: false
        })

        if (!session) {
            return res.status(400).json({ message: "Invalid refresh token" });
        }

        session.revoked = true;
        session.revokedAt = new Date();
        await session.save();

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


export 















    // login user
    // export const login = async (req, res) => {
    //     console.log("Login Controller");
    // }


    // logout all user
    // export const logoutAll = async (req, res) => {
    //     console.log("Logout All Controller");
    // }

    // delete all users
    export const deleteAllUsers = async (req, res) => {
        try {
            await userModel.deleteMany({});
            res.status(200).json({ success: true, message: "All users deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    // delete all sessions
    export const deleteAllSessions = async (req, res) => {
        try {
            await sessionModel.deleteMany({});
            res.status(200).json({ success: true, message: "All sessions deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }       
