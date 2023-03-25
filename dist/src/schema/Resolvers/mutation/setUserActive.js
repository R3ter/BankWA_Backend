"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../../../../models/UserModel"));
exports.default = async (_, { userPassport, active }) => {
    return await UserModel_1.default.updateOne({ passportNumber: userPassport }, { $set: { active } }).then((e) => {
        return active;
    });
};
//# sourceMappingURL=setUserActive.js.map