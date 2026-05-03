import User from "../models/user.model.js";

// Register a new user
export const register = async (req, res) => {
    res.status(201).json({
        message: "User Registered feature is under development",
        user: req.body,
    });
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