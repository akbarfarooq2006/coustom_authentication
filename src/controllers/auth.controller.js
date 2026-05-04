import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Register a new user
export const register = async (req, res) => {
    const { username, email, password } = req.body;

    // it will from database username or email is already exist or not
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
    res.status(201).json({ success: true, message: "User registered successfully", user });

}
























    // // login user
    // export const login = async (req, res) => {
    //     console.log("Login Controller");
    // }

    // // logout user
    // export const logout = async (req, res) => {
    //     console.log("Logout Controller");
    // }

    // // logout all user
    // export const logoutAll = async (req, res) => {
    //     console.log("Logout All Controller");
    // }