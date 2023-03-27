import { loadFilesSync } from "@graphql-tools/load-files";
import express from "express";
import { createSchema, createYoga } from "graphql-yoga";
import Revolvers from "./src/schema/Resolvers/resolver";
import dotenv from "dotenv";
import database from "./database";
import path, { dirname } from "path";
dotenv.config();

database()
  .then(() => {
    console.log("database connected!");
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
    app.use("/", express.static("public"));
    app.use((req, res, next) => {
      res.sendFile("/public/index.html");
    });

    app.listen(4000, () => {
      console.log(
        "Running a GraphQL API server at http://localhost:4000/graphql"
      );
    });
  })
  .catch((e) => {
    console.log("%c cannot connect to database!");
    console.log(e);
  });
