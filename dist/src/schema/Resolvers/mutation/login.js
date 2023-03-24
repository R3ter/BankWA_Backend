"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../../../../auth/Token");
const UserModel_1 = __importDefault(require("../../../../models/UserModel"));
exports.default = async (_, args, context) => {
    const user = await UserModel_1.default.findOne({
        email: args.loginData.username,
        password: args.loginData.password,
    });
    if (user) {
        const token = (0, Token_1.signToken)({
            id: user._id,
            name: user.name,
            username: user.passportNumber,
            role: user.role,
        });
        context.res.cookie("token", token);
        return {
            name: user.name,
            error: false,
            token,
        };
    }
    return {
        error: true,
        msg: "username or password is incorrect",
    };
};
//# sourceMappingURL=login.js.map