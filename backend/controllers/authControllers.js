import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

import User from '../models/userModel.js';
import Auth from '../models/authModel.js';

export const register = async (req, res) => {
    console.log(req.body)
  const { name,email, password, role } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
        name,
      email,
      password: hashedPassword,
      role: role || "user"
    });

    // Generate token
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRY || "1h" }
    );

    // Save login log
    await Auth.create({
      user_id: newUser.id,
      token: token,
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      role: newUser.role,
      user_id: newUser.id,
    });

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRY || '1h' }
      );

    //   const refresh_token = jwt.sign(
    //     { id: user.id, role: user.role },
    //     process.env.JWT_SECRET,
    //     { expiresIn: process.env.TOKEN_EXPIRY || '12h' }
    //   );
  
      await Auth.create({
        user_id: user.id,
        token,
      });
  
      res.json({ token,
         role: user.role,
         user_id: user.id, });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const getUserProfile = async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, {
        // attributes: ['id', 'email', 'role']
      });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.json(user);
    } catch (err) {
      console.error("Profile error:", err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll({
        // attributes: ['id', 'email', 'role']
      });
      res.json(users);
    } catch (err) {
      console.error("Get all users error:", err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const logout = async (req, res) => {
    const { user_id } = req.params;
  
    if (!user_id) {
        return res.status(400).json({ message: 'User ID is required' });
      }

    try {
      // Assuming you have an Auth table with user_id and token as column
      await Auth.destroy({
        where: { user_id }
      });
  
      res.status(200).json({ message: 'Logout successful. Token deleted.' });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ message: 'Server error during logout.' });
    }
  };