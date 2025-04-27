import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js"; // Utility for uploading profile pics

// Helper to create JWT token
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Signup controller
export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    let profilePic = "";

    // Optional: handle profile picture upload
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      profilePic = result.secure_url;
    }

    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: "Username already taken" });

    const user = new User({ username, password, profilePic });
    await user.save();

    const token = createToken(user);
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = createToken(user);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // don't send passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const updates = { username };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updates.profilePic = result.secure_url;
    }

    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check if user is Admin
export const isAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
