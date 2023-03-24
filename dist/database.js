"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function default_1() {
    return await mongoose_1.default.connect("mongodb+srv://PC:" +
        process.env.DBPASS +
        "@cluster0.47tub.mongodb.net/?retryWrites=true&w=majority");
}
exports.default = default_1;
//# sourceMappingURL=database.js.map