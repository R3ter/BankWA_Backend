"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = require("chai");
const UserModel_1 = __importDefault(require("../../../../models/UserModel"));
const checkUserActive_1 = __importDefault(require("../../../functions/checkUserActive"));
const Deposit_1 = __importDefault(require("./Deposit"));
const WithdrawMoney_1 = __importDefault(require("./WithdrawMoney"));
const Transfer_1 = __importDefault(require("./Transfer"));
describe("transfer function", () => {
    let sandbox;
    before(() => {
        sandbox = sinon_1.default.createSandbox();
    });
    afterEach(() => {
        sandbox.restore();
    });
    it("should return false if amount is negative or zero", async () => {
        const result = await (0, Transfer_1.default)(null, {
            from: "123",
            to: "456",
            amount: -10,
        });
        (0, chai_1.expect)(result.result).to.be.false;
        (0, chai_1.expect)(result.msg).to.equal("amount cant be negative or zero");
    });
    it("should return false if 'from' user is not found", async () => {
        sandbox.stub(UserModel_1.default, "findOne").resolves(null);
        const result = await (0, Transfer_1.default)(null, { from: "123", to: "456", amount: 10 });
        (0, chai_1.expect)(result.result).to.be.false;
        (0, chai_1.expect)(result.msg).to.equal("user was not found");
    });
    it("should return false if 'to' user is not found", async () => {
        sandbox
            .stub(UserModel_1.default, "findOne")
            .onFirstCall()
            .resolves({})
            .onSecondCall()
            .resolves(null);
        const result = await (0, Transfer_1.default)(null, { from: "123", to: "456", amount: 10 });
        (0, chai_1.expect)(result.result).to.be.false;
        (0, chai_1.expect)(result.msg).to.equal("user was not found");
    });
    it("should return false if 'from' user is not active", async () => {
        sandbox.stub(UserModel_1.default, "findOne").resolves({});
        sandbox.stub(checkUserActive_1.default, "default").resolves(false);
        const result = await (0, Transfer_1.default)(null, { from: "123", to: "456", amount: 10 });
        (0, chai_1.expect)(result.result).to.be.false;
        (0, chai_1.expect)(result.msg).to.equal("User is not active");
    });
    it("should return false if 'to' user is not active", async () => {
        sandbox
            .stub(UserModel_1.default, "findOne")
            .onFirstCall()
            .resolves({})
            .onSecondCall()
            .resolves({});
        sandbox.stub(checkUserActive_1.default, "default").resolves(false);
        const result = await (0, Transfer_1.default)(null, { from: "123", to: "456", amount: 10 });
        (0, chai_1.expect)(result.result).to.be.false;
        (0, chai_1.expect)(result.msg).to.equal("User is not active");
    });
    it("should return false if 'from' user does not have enough cash or credit", async () => {
        sandbox.stub(UserModel_1.default, "findOne").resolves({ cash: 5, credit: 0 });
        const result = await (0, Transfer_1.default)(null, { from: "123", to: "456", amount: 10 });
        (0, chai_1.expect)(result.result).to.be.false;
        (0, chai_1.expect)(result.msg).to.equal("user does not have enough cash or credit!");
    });
    it("should call withdraw and deposit methods with correct arguments", async () => {
        const withdrawStub = sandbox.stub().resolves({ result: true });
        const depositStub = sandbox.stub().resolves({ result: true });
        sandbox
            .stub(UserModel_1.default, "findOne")
            .onFirstCall()
            .resolves({ cash: 5, credit: 10 })
            .onSecondCall()
            .resolves({ cash: 0, credit: 0 });
        sandbox.stub(checkUserActive_1.default, "default").resolves(true);
        sandbox
            .withArgs(null, { userPassport: "123", amount: 10 })
            .resolves({ result: true });
        sandbox
            .withArgs(null, { userPassport: "456", amount: 10 })
            .resolves({ result: true });
        const result = await (0, Transfer_1.default)(null, { from: "123", to: "456", amount: 10 });
        sinon_1.default.assert.calledOnce(withdrawStub);
        sinon_1.default.assert.calledWith(withdrawStub, null, {
            userPassport: "123",
            amount: 10,
        });
        sinon_1.default.assert.calledOnce(depositStub);
        sinon_1.default.assert.calledWith(depositStub, null, {
            userPassport: "456",
            amount: 10,
        });
        (0, chai_1.expect)(result.result).to.be.true;
        (0, chai_1.expect)(result.msg).to.equal("transfer completed!");
    });
    it("should return false if withdraw or deposit fails", async () => {
        sandbox
            .stub(UserModel_1.default, "findOne")
            .onFirstCall()
            .resolves({ cash: 5, credit: 10 })
            .onSecondCall()
            .resolves({ cash: 0, credit: 0 });
        sandbox.stub(checkUserActive_1.default, "default").resolves(true);
        sandbox.stub(Deposit_1.default, "default").resolves({ result: false });
        sandbox.stub(WithdrawMoney_1.default, "default").resolves({ result: false });
        const result = await (0, Transfer_1.default)(null, { from: "123", to: "456", amount: 10 });
        (0, chai_1.expect)(result.result).to.be.false;
        (0, chai_1.expect)(result.msg).to.equal("Unknown error!");
    });
});
//# sourceMappingURL=Transfer.test.js.map