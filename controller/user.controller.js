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
    const user = await User.findById(req.params.id, '-password -__v');
    
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    
    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
}

const createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const userResponse = newUser.toObject();
    delete userResponse.password;
    delete userResponse.__v;
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userResponse
    });
  } catch (error) {
    next(error);
  }
}

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password -__v');
    
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: null
    });
  } catch (error) {
    next(error);
  }
}

export { getAllUsers, getUser, createUser, updateUser, deleteUser };