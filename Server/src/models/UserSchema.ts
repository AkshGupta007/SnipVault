// import mongoose, { Schema, Document } from 'mongoose';
// import bcrypt from 'bcryptjs';

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   resetPasswordToken?: string | undefined;
//   resetPasswordExpire?: Date | undefined;
//   comparePassword(candidatePassword: string): Promise<boolean>;
// }

// const userSchema = new Schema<IUser>(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },
//     // Forgot Password
//     resetPasswordToken: {
//       type: String,
//       default: undefined,
//     },

//     resetPasswordExpire: {
//       type: Date,
//       default: undefined,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password'))  return
//   this.password = await bcrypt.hash(this.password, 10);
// });

// userSchema.methods.comparePassword = async function(candidate:string){
//     return await bcrypt.compare(candidate, this.password);
// }

// const User = mongoose.model<IUser>('User', userSchema);
// export default User;

import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // optional — Google users have no password
  googleId?: string;
  avatar?: string;
  resetPasswordToken?: string | undefined;
  resetPasswordExpire?: Date | undefined;
  comparePassword(candidatePassword: string): Promise<boolean>;
  isVerified?: boolean;
verificationToken?: string | undefined;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: false, // not required for Google users
      minlength: 6,
      default: null,
    },
    googleId: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    resetPasswordToken: {
      type: String,
      default: undefined,
    },
    resetPasswordExpire: {
      type: Date,
      default: undefined,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: undefined,
    },
  },
  {
    timestamps: true,
  },
);

// Only hash password if it was modified and actually exists
// ✅ fixed
userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (
  candidate: string,
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidate, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;