"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../../models/UserModel"));
exports.default = async (user) => {
    if (typeof user == "string") {
        return await UserModel_1.default.findOne({ passportNumber: user }).then((e) => e.active);
    }
    else {
        return user.active;
    }
};
//# sourceMappingURL=checkUserActive.js.map