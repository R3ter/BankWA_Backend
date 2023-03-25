"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../../../../models/UserModel"));
const checkUserActive_1 = __importDefault(require("../../../functions/checkUserActive"));
const Deposit_1 = __importDefault(require("./Deposit"));
const WithdrawMoney_1 = __importDefault(require("./WithdrawMoney"));
exports.default = async (_, { from, to, amount }) => {
    if (amount <= 0) {
        return { result: false, msg: "amount cant be negative or zero" };
    }
    const user = await UserModel_1.default.findOne({ passportNumber: from });
    const user1 = await UserModel_1.default.findOne({ passportNumber: to });
    if (!user)
        return { result: false, msg: "user was not found" };
    if (!user1)
        return { result: false, msg: "user was not found" };
    if (!(await (0, checkUserActive_1.default)(user1)) || !(await (0, checkUserActive_1.default)(user)))
        return { result: false, msg: "User is not active" };
    if (user.cash + user.credit < amount)
        return { result: false, msg: "user does not have enough cash or credit!" };
    const withdraw = (0, WithdrawMoney_1.default)(_, { userPassport: from, amount });
    const deposit = (0, Deposit_1.default)(_, { userPassport: to, amount });
    return Promise.all([withdraw, deposit])
        .then((e) => {
        if (e[1].result && e[0].result)
            return {
                result: true,
                msg: "transfer completed!",
            };
        return { result: false, msg: "Unknown error!" };
    })
        .catch(() => ({ result: false, msg: "Unknown error!" }));
};
//# sourceMappingURL=Transfer.js.map