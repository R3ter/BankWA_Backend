"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const UserModel_1 = __importDefault(require("../../../../models/UserModel"));
const Deposit_1 = __importDefault(require("./Deposit"));
describe("updateUserCash function", () => {
    before(async () => {
        await new UserModel_1.default({
            passportNumber: "123499999",
            name: "waddwadwa",
            password: "dwaawdadwadw",
        }).save();
        await new UserModel_1.default({
            passportNumber: "123599999",
            name: "waddwadwa",
            password: "dwaawdadwadw",
            active: true,
        }).save();
    });
    it("should return false and error message if amount is negative or zero", async () => {
        const result = await (0, Deposit_1.default)(null, {
            userPassport: "123599999",
            amount: -100,
        });
        (0, chai_1.expect)(result).to.deep.equal({
            result: false,
            msg: "amount cant be negative or zero",
        });
    });
    it("should return false and error message if user is not active", async () => {
        const result = await (0, Deposit_1.default)(null, {
            userPassport: "123499999",
            amount: 100,
        });
        (0, chai_1.expect)(result).to.deep.equal({ result: false, msg: "User is not active" });
    });
    it("should return true and success message if user cash was updated", async () => {
        const result = await (0, Deposit_1.default)(null, {
            userPassport: "123599999",
            amount: 100,
        });
        (0, chai_1.expect)(result).to.deep.equal({ result: true, msg: "user updated!" });
    });
    it("should return false and error message if user was not found", async () => {
        const result = await (0, Deposit_1.default)(null, {
            userPassport: "213213",
            amount: 100,
        });
        (0, chai_1.expect)(result).to.deep.equal({ result: false, msg: "user was not found!" });
    });
    after(async () => {
        await UserModel_1.default.deleteOne({ passportNumber: "123499999" });
        await UserModel_1.default.deleteOne({ passportNumber: "123599999" });
    });
});
//# sourceMappingURL=Deposit.test.js.map