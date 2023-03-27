import assert from "assert";
import UserModel from "../../../../models/UserModel";
import addAccount from "./AddAccount";

describe("addAccount", () => {
  it("should add an account to the database", async () => {
    const userData = {
      name: "John Doe",
      passportNumber: "123456789",
      password: "password123",
    };

    const result = await addAccount(null, { userData }, null);

    assert.strictEqual(result.error, false);
  });
  it("should return an error if the passport number is already in use", async () => {
    const userData = {
      name: "Jane Doe",
      passportNumber: "123456789",
      password: "password456",
    };

    const result = await addAccount(null, { userData }, null);

    assert.strictEqual(result.error, true);
    assert.strictEqual(result.msg, "this passport number is already in data");
  });

  it("should return an error if the passport number is invalid", async () => {
    const userData = {
      name: "Bob Smith",
      passportNumber: "4234234",
      password: "password789",
    };

    const result = await addAccount(null, { userData }, null);

    assert.strictEqual(result.error, true);
    assert.strictEqual(
      result.msg,
      "The passport number must consist of 9 digits and should not contain any letters or special characters."
    );
  });

  it("should return an error if the password is too short", async () => {
    const userData = {
      name: "Alice Johnson",
      passportNumber: "987654321",
      password: "short",
    };

    const result = await addAccount(null, { userData }, null);

    assert.strictEqual(result.error, true);
    assert.strictEqual(result.msg, "password must be at least 8 characters");
  });
  after(async () => {
    await UserModel.deleteOne({ passportNumber: "123456789" }).then((e) =>
      console.log(e)
    );
  });
});
