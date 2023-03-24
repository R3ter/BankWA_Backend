"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../../../../auth/Token");
const UserModel_1 = __importDefault(require("../../../../models/UserModel"));
exports.default = async (_, { userData: { name, passportNumber, password } }, context) => {
    return await new UserModel_1.default({ name, passportNumber, password })
        .save()
        .then((e) => {
        return {
            token: (0, Token_1.signToken)({
                username: passportNumber,
                id: e._id,
                name,
                role: "User",
            }),
            name,
            error: false,
        };
    })
        .catch((error) => {
        if (error.name == "MongoServerError" && error.code == 11000) {
            return {
                error: true,
                msg: "this passport number is already in data",
            };
        }
        if (error.name === "ValidationError")
            return {
                error: true,
                msg: error.errors[Object.keys(error.errors)[0]].message,
            };
    });
};
//# sourceMappingURL=AddAccount.js.map