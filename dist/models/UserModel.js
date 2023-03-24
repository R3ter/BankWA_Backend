"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    passportNumber: {
        type: String,
        required: true,
        unique: true,
        validate: (value) => {
            if (!isNaN(value)) {
                if (value.length == 9)
                    return true;
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
exports.default = mongoose_1.default.model("users", userSchema);
//# sourceMappingURL=UserModel.js.map