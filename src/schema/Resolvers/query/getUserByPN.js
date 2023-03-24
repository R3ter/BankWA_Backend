"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../../../../models/UserModel"));
const graphql_fields_1 = __importDefault(require("graphql-fields"));
exports.default = async (_, args, _context, info) => {
    return await UserModel_1.default.findOne({
        passportNumber: args.passportNumber,
    }).select(Object.keys((0, graphql_fields_1.default)(info)));
};
//# sourceMappingURL=getUserByPN.js.map