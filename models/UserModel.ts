import mongoose from "mongoose";
import validator from "validator";

interface IUser {
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
      throw new Error("Passport number is not correct");
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
