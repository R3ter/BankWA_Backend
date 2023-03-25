import mongoose from "mongoose";
import validator from "validator";

export interface IUser {
  passportNumber: number;
  name: string;
  password: string;
  active: boolean;
  cash: number;
  credit: number;
  role: "user" | "admin";
}
const userSchema = new mongoose.Schema({
  passportNumber: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => {
      if (!isNaN(value)) {
        if (value.length == 9) return true;
      }
      throw new Error(
        "The passport number must consist of 9 digits and should not contain any letters or special characters."
      );
    },
  },
  name: {
    type: String,
    validate: (value) => {
      return !/[0-9]/.test(value);
    },
    max: 30,
    min: 3,
  },
  password: {
    type: String,
    required: true,
    validate: (value) => {
      if (value.length < 8) {
        throw new Error("password must be at least 8 characters");
      }
      return true;
    },
  },
  active: {
    type: Boolean,
    default: false,
  },
  cash: {
    type: Number,
    default: 0,
    min: 0,
  },
  credit: {
    type: Number,
    default: 0,
    min: 0,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

export default mongoose.model<IUser>("users", userSchema);
