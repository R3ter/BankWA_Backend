"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../../../../models/UserModel"));
const checkUserActive_1 = __importDefault(require("../../../functions/checkUserActive"));
exports.default = async (_, { userPassport, amount }) => {
    if (amount <= 0) {
        return { result: false, msg: "amount cant be negative or zero" };
    }
    const user = await UserModel_1.default.findOne({ passportNumber: userPassport });
    if (!user)
        return { result: false, msg: "user was not found!" };
    if (!(await (0, checkUserActive_1.default)(user)))
        return { result: false, msg: "User is not active" };
    return await UserModel_1.default.updateOne({ passportNumber: userPassport }, {
        $inc: {
            cash: amount,
        },
    })
        .then((e) => {
        if (e.modifiedCount > 0)
            return { result: true, msg: "user updated!" };
        return { result: false, msg: "user was not found!" };
    })
        .catch(() => ({ result: false, msg: "user was not found!" }));
};
//# sourceMappingURL=Deposit.js.map