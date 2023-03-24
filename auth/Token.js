"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signToken = ({ username, name, id, role }) => {
    console.log(`username: ${username}`);
    console.log(`id: ${id}`);
    console.log(`name: ${name}`);
    if (!username || !id) {
        throw new Error("data is not provided correctly");
    }
    return jsonwebtoken_1.default.sign({ username, name, id, role }, process.env.SECRET);
};
exports.signToken = signToken;
const checkToken = (token, role = ["user"]) => {
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET);
    }
    catch (e) {
        throw new Error("Token is not valid");
    }
    if (!role.includes(decoded.role)) {
        throw new Error("user is not authorized");
    }
    return true;
};
exports.checkToken = checkToken;
//# sourceMappingURL=Token.js.map