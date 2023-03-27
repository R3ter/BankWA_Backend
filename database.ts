import mongoose from "mongoose";
import { env } from "process";

export default async function () {
  console.log("connecting to database.....");

  return await mongoose.connect(
    "mongodb+srv://PC:" +
      process.env.DBPASS +
      "@cluster0.47tub.mongodb.net/?retryWrites=true&w=majority"
  );
}
