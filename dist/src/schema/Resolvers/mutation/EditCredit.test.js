"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const UserModel_1 = __importDefault(require("../../../../models/UserModel"));
const EditCredit_1 = __importDefault(require("./EditCredit"));
describe("updateCredit", () => {
    const activepass = "987654322";
    const unactivepass = "987654321";
    before(async () => {
        await new UserModel_1.default({
            passportNumber: unactivepass,
            name: "waddwadwa",
            password: "dwaawdadwadw",
        }).save();
        await new UserModel_1.default({
            passportNumber: activepass,
            name: "waddwadwa",
            password: "dwaawdadwadw",
            active: true,
        }).save();
    });
    it("should return an error if the amount is negative", async () => {
        const result = await (0, EditCredit_1.default)(null, {
            userPassport: activepass,
            amount: -10,
        });
        assert_1.default.strictEqual(result.result, false);
        assert_1.default.strictEqual(result.msg, "amount cant be a negative number");
    });
    it("should return an error if the user is not active", async () => {
        const result = await (0, EditCredit_1.default)(null, {
            userPassport: unactivepass,
            amount: 100,
        });
        assert_1.default.strictEqual(result.result, false);
        assert_1.default.strictEqual(result.msg, "User is not active");
    });
    it("should update the user's credit if user exists and amount is valid", async () => {
        // Create a test user with initial credit of 500
        const result = await (0, EditCredit_1.default)(null, {
            userPassport: activepass,
            amount: 1000,
        });
        assert_1.default.strictEqual(result.result, true);
        assert_1.default.strictEqual(result.msg, "user updated!");
        // Check if user's credit is updated correctly
        const user = await UserModel_1.default.findOne({ passportNumber: activepass });
        assert_1.default.strictEqual(user.credit, 1000);
    });
    it("should return an error if user is not active", async () => {
        const result = await (0, EditCredit_1.default)(null, {
            userPassport: "987654321",
            amount: 100,
        });
        assert_1.default.strictEqual(result.result, false);
        assert_1.default.strictEqual(result.msg, "User is not active");
    });
    it("should return an error if user is not found", async () => {
        const result = await (0, EditCredit_1.default)(null, {
            userPassport: "98765411321",
            amount: 100,
        });
        assert_1.default.strictEqual(result.result, false);
        assert_1.default.strictEqual(result.msg, "user was not found!");
    });
    after(async () => {
        // Delete the test user after each test
        await UserModel_1.default.deleteOne({ passportNumber: activepass });
        await UserModel_1.default.deleteOne({ passportNumber: unactivepass });
    });
});
//# sourceMappingURL=EditCredit.test.js.map