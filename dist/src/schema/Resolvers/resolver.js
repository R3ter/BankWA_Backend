"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddAccount_1 = __importDefault(require("./mutation/AddAccount"));
const Deposit_1 = __importDefault(require("./mutation/Deposit"));
const EditCredit_1 = __importDefault(require("./mutation/EditCredit"));
const login_1 = __importDefault(require("./mutation/login"));
const Transfer_1 = __importDefault(require("./mutation/Transfer"));
const WithdrawMoney_1 = __importDefault(require("./mutation/WithdrawMoney"));
const getAllUsers_1 = __importDefault(require("./query/getAllUsers"));
const getUserByPN_1 = __importDefault(require("./query/getUserByPN"));
exports.default = {
    Query: {
        getAllUsers: getAllUsers_1.default,
        getUserByPN: getUserByPN_1.default,
    },
    Mutation: {
        login: login_1.default,
        addAccount: AddAccount_1.default,
        Deposit: Deposit_1.default,
        editCredit: EditCredit_1.default,
        WithdrawMoney: WithdrawMoney_1.default,
        Transfer: Transfer_1.default,
    },
};
//# sourceMappingURL=resolver.js.map