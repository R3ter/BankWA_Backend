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
    if (user.cash + user.credit < amount)
        return { result: false, msg: "user does not have enough cash or credit!" };
    const over = user.cash - amount;
    return await UserModel_1.default.updateOne({ passportNumber: userPassport }, {
        $inc: {
            cash: over >= 0 ? -amount : -user.cash,
            credit: over < 0 ? (user.credit > -over ? over : -user.credit) : 0,
        },
    })
        .then(() => ({ result: true, msg: "User updated!" }))
        .catch((e) => {
        return { result: false, msg: "Unexpected error!" };
    });
};
//# sourceMappingURL=WithdrawMoney.js.map