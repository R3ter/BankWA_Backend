"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../../../../models/UserModel"));
const graphql_fields_1 = __importDefault(require("graphql-fields"));
exports.default = async (_, { sortBy, filter, onlyActive }, _context, info) => {
    const sort = {};
    sort[sortBy] = -1;
    return await UserModel_1.default.find({
        $and: [
            { ...(onlyActive ? { active: true } : {}) },
            {
                ...(filter?.starts != undefined && filter?.ends
                    ? {
                        cash: { $gt: filter?.starts, $lt: filter?.ends },
                    }
                    : {}),
            },
        ],
    })
        .select(Object.keys((0, graphql_fields_1.default)(info)))
        .sort(sort);
};
//# sourceMappingURL=getAllUsers.js.map