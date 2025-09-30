import mongoose from "mongoose"
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";



export const signUP = async(req,res,next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
       const {username, email, password} = req.body;

       const existingUser = await User.findOne({email});
         if(existingUser){
            const error = new Error('User already exists! Login instead');
            error.statusCode = 409;
            throw error;
         }
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);
         const newUser = await User.create([{username, email, password: hashedPassword}], {session});

            const token = jwt.sign({userId: newUser[0]._id}, process.env.JWT_SECRET, {expiresIn:"2d"});
            
            await session.commitTransaction();
            
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                data:{
                    userId: newUser[0]._id,
                    name: newUser[0].username,
                    email: newUser[0].email,
                    token
                }
            });
            
        
    } catch (error) {
        await session.abortTransaction();
        return next(error);
    } finally {
        session.endSession();
    }
}
export const signIN =async (req,res,next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            const error = new Error('User does not exist! SignUP instead');
            error.statusCode = 404;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn:"7d"});
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: {
                userId: user._id,
                name: user.username,
                email: user.email,
                token
            }
        });
        

    } catch (error) {
        return next(error);
    }    
}

export const signOUT = async(req,res,next) => {}