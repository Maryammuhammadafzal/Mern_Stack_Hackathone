import User from "../Models/User.js";

// ✅ GET all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ POST /signup (Clerk handles real signup, this just stores to DB)
export const signup = async (req, res) => {
  try {
    const { clerkId } = req.body;

    if (!clerkId) return res.status(400).json({ success: false, message: "clerkId required" });

    let user = await User.findOne({ clerkId });

    if (user) return res.status(200).json({ success: true, message: "User already exists", user });

    user = await User.create({ clerkId });

    res.status(201).json({ success: true, message: "User created", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ POST /login (Handled by Clerk - optional dummy response)
export const login = async (req, res) => {
  res.json({ success: true, message: "Login is handled by Clerk." });
};

// ✅ DELETE a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, message: "User deleted", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ PUT update user role
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedUser) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, message: "User updated", updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ GET /isAdmin
export const isAdmin = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    res.json({ success: true, message: "User is admin" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
