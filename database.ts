import mongoose from "mongoose";

export default async function () {
  return await mongoose.connect(
    "mongodb+srv://PC:" +
      process.env.DBPASS +
      "@cluster0.47tub.mongodb.net/?retryWrites=true&w=majority"
  );
}
