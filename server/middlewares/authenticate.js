import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Make sure path is correct!

const authenticate = async (req, res, next) => {
  try {
    // Get token from headers
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to req
    const user = await User.findById(decoded.id).select("-password"); // safe: no password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // now you have full user in req.user
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export default authenticate;
