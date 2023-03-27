"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// connect to the test database
before(async () => {
    await mongoose_1.default.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0");
});
// disconnect from the test database
after(async () => {
    await mongoose_1.default.connection.close();
});
//# sourceMappingURL=database.test.js.map