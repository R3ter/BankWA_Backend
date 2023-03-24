import { loadFilesSync } from "@graphql-tools/load-files";
import express from "express";
import { createSchema, createYoga } from "graphql-yoga";
import Revolvers from "./src/schema/Resolvers/resolver";
import dotenv from "dotenv";
import database from "./database";
dotenv.config();

database();

const app = express();

const yoga = createYoga({
  context: async ({ req, res }: any) => {
    return { req, res };
  },
  schema: createSchema({
    typeDefs: loadFilesSync("src/schema/graphql/**/*.graphql"),
    resolvers: Revolvers,
  }),
});

app.use("/graphql", yoga);

app.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
});
