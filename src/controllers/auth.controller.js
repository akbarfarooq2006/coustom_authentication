import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/configs.js";

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

    const token = jwt.sign(
        { 
            userId: user._id,
            email: user.email,
            username: user.username
        },
        config.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
        User:{
            id: user._id,
            email: user.email,
            username: user.username,
        }
     });
}

// Getme
export const getMe = async (req, res) => {

    const token = req.headers.authorization?.split(' ')[1];
      
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    console.log("Decodded of JWT: ---------------> ",decoded);
    res.status(200).json({ success: true, message: "User authenticated successfully", decoded });
    

}

















// login user
// export const login = async (req, res) => {
//     console.log("Login Controller");
// }

// logout user
// export const logout = async (req, res) => {
//     console.log("Logout Controller");
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