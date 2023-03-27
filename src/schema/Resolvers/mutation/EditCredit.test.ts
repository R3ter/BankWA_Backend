import assert from "assert";
import UserModel from "../../../../models/UserModel";
import updateCredit from "./EditCredit";

describe("updateCredit", () => {
  const activepass = "987654322";
  const unactivepass = "987654321";
  before(async () => {
    await new UserModel({
      passportNumber: unactivepass,
      name: "waddwadwa",
      password: "dwaawdadwadw",
    }).save();
    await new UserModel({
      passportNumber: activepass,
      name: "waddwadwa",
      password: "dwaawdadwadw",
      active: true,
    }).save();
  });

  it("should return an error if the amount is negative", async () => {
    const result = await updateCredit(null, {
      userPassport: activepass,
      amount: -10,
    });

    assert.strictEqual(result.result, false);
    assert.strictEqual(result.msg, "amount cant be a negative number");
  });

  it("should return an error if the user is not active", async () => {
    const result = await updateCredit(null, {
      userPassport: unactivepass,
      amount: 100,
    });

    assert.strictEqual(result.result, false);
    assert.strictEqual(result.msg, "User is not active");
  });

  it("should update the user's credit if user exists and amount is valid", async () => {
    // Create a test user with initial credit of 500

    const result = await updateCredit(null, {
      userPassport: activepass,
      amount: 1000,
    });

    assert.strictEqual(result.result, true);
    assert.strictEqual(result.msg, "user updated!");

    // Check if user's credit is updated correctly
    const user = await UserModel.findOne({ passportNumber: activepass });
    assert.strictEqual(user.credit, 1000);
  });

  it("should return an error if user is not active", async () => {
    const result = await updateCredit(null, {
      userPassport: "987654321",
      amount: 100,
    });

    assert.strictEqual(result.result, false);
    assert.strictEqual(result.msg, "User is not active");
  });

  it("should return an error if user is not found", async () => {
    const result = await updateCredit(null, {
      userPassport: "98765411321",
      amount: 100,
    });

    assert.strictEqual(result.result, false);
    assert.strictEqual(result.msg, "user was not found!");
  });

  after(async () => {
    // Delete the test user after each test
    await UserModel.deleteOne({ passportNumber: activepass });
    await UserModel.deleteOne({ passportNumber: unactivepass });
  });
});
