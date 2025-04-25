// middlewares/clerk.js
import { getAuth } from "@clerk/nextjs/server"; // for Next.js backend routes
import User from "../Models/User.js";

const authenticate = async (req, res, next) => {
	try {
	  // 🔑 Get userId from Clerk Auth
	  const { userId } = getAuth(req);
      
	  if (!userId) {
	    return res.status(401).json({
	      success: false,
	      message: "Unauthorized - No Clerk session found",
	    });
	  }
      
	  console.log("🧾 Clerk userId:", userId);
      
	  // 🔍 Check if user exists in MongoDB
	  let user = await User.findOne({ clerkId: userId });
      
	  // 📝 If not, create user in your DB
	  if (!user) {
	    user = await User.create({
	      clerkId: userId,
	      role: "user", // default role, you can adjust this
	      // add more fields if needed
	    });
	    console.log("✅ New user created in DB:", user);
	  }
      
	  // Attach user to request
	  req.user = {
	    id: user._id.toString(),
	    role: user.role,
	  };
      
	  next();
	} catch (error) {
	  console.error("❌ Clerk Auth Error:", error.message);
	  return res.status(401).json({
	    success: false,
	    message: "Unauthorized - Clerk auth failed",
	  });
	}
      };
      
      export default authenticate;