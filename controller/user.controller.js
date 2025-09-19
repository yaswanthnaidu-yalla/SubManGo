import e from "express";
import User from "../models/user.model.js";
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, '-password -__v'); 
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: users
        });
    } catch (error) {
        next(error);
    }
}
const getUser = async (req, res, next) => {
    try {
        const user = await User.findById((req.params.id), '-password -__v');
        res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            data: user
        });
        if (!User) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
}
export { getAllUsers, getUser };