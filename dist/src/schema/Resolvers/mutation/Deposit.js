"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../../../../models/UserModel"));
exports.default = async (_, { userPassport, amount }) => {
    if (amount < 0) {
        return { result: false, msg: "amount cant be a negative number" };
    }
    return await UserModel_1.default.updateOne({ passportNumber: userPassport }, {
        $inc: {
            cash: amount,
        },
    })
        .then((e) => {
        if (e.matchedCount > 0)
            return { result: true, msg: "user updated!" };
        return { result: false, msg: "user was not found!" };
    })
        .catch(() => ({ result: false, msg: "user was not found!" }));
};
//# sourceMappingURL=Deposit.js.map