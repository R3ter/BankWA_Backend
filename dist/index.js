"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const load_files_1 = require("@graphql-tools/load-files");
const express_1 = __importDefault(require("express"));
const graphql_yoga_1 = require("graphql-yoga");
const resolver_1 = __importDefault(require("./src/schema/Resolvers/resolver"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./database"));
dotenv_1.default.config();
(0, database_1.default)()
    .then(() => {
    console.log("database connected!");
    const app = (0, express_1.default)();
    const yoga = (0, graphql_yoga_1.createYoga)({
        context: async ({ req, res }) => {
            return { req, res };
        },
        schema: (0, graphql_yoga_1.createSchema)({
            typeDefs: (0, load_files_1.loadFilesSync)("src/schema/graphql/**/*.graphql"),
            resolvers: resolver_1.default,
        }),
    });
    app.use("/graphql", yoga);
    app.listen(4000, () => {
        console.log("Running a GraphQL API server at http://localhost:4000/graphql");
    });
})
    .catch((e) => {
    console.log("%c cannot connect to database!");
    console.log(e);
});
//# sourceMappingURL=index.js.map