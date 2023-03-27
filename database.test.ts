import assert from "assert";
import mongoose from "mongoose";

// connect to the test database
before(async () => {
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0"
  );
});

// disconnect from the test database
after(async () => {
  await mongoose.connection.close();
});
