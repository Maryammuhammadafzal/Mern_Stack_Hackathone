// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const UserSchema = new mongoose.Schema(
//   {
//     username: { type: String, required: true},
//     password: { type: String, required: true },
//     profilePic: { type: String, default: "" },
//     isAdmin: { type: Boolean, default: false }
//   },
//   { timestamps: true }
// );

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// UserSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// const User = mongoose.model("User", UserSchema);

// export default User;
