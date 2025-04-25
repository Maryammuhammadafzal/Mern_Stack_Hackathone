import express from "express";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();
import {
  getAllUsers,
  updateUser,
  deleteUser,
  login,
  signup,
  isAdmin
} from "../controllers/authController.js";


router.post("/signup", signup);
router.post("/login", login);
router.get("/users", authenticate , getAllUsers);
router.delete("/user/:id", authenticate , deleteUser)
router.put("/user/:id", authenticate , updateUser)
router.get("/isAdmin", authenticate , authenticate,isAdmin)


export default router;