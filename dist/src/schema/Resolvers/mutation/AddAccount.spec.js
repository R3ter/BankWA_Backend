"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const AddAccount_1 = __importDefault(require("./AddAccount"));
describe("checking addAccount function", () => {
    it("should add a user", async () => {
        const result = await (0, AddAccount_1.default)(undefined, {
            userData: { name: "waddwa", passportNumber: "231", password: "312321" },
        }, undefined);
        chai_1.assert.equal(result, { error: false, msg: "", token: "", name: "" });
    });
});
//# sourceMappingURL=AddAccount.spec.js.map