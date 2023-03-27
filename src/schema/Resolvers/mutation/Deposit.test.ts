import { expect } from "chai";
import UserModel from "../../../../models/UserModel";
import updateUserCash from "./Deposit";

describe("updateUserCash function", () => {
  before(async () => {
    await new UserModel({
      passportNumber: "123499999",
      name: "waddwadwa",
      password: "dwaawdadwadw",
    }).save();
    await new UserModel({
      passportNumber: "123599999",
      name: "waddwadwa",
      password: "dwaawdadwadw",
      active: true,
    }).save();
  });
  it("should return false and error message if amount is negative or zero", async () => {
    const result = await updateUserCash(null, {
      userPassport: "123599999",
      amount: -100,
    });
    expect(result).to.deep.equal({
      result: false,
      msg: "amount cant be negative or zero",
    });
  });

  it("should return false and error message if user is not active", async () => {
    const result = await updateUserCash(null, {
      userPassport: "123499999",
      amount: 100,
    });
    expect(result).to.deep.equal({ result: false, msg: "User is not active" });
  });

  it("should return true and success message if user cash was updated", async () => {
    const result = await updateUserCash(null, {
      userPassport: "123599999",
      amount: 100,
    });
    expect(result).to.deep.equal({ result: true, msg: "user updated!" });
  });

  it("should return false and error message if user was not found", async () => {
    const result = await updateUserCash(null, {
      userPassport: "213213",
      amount: 100,
    });
    expect(result).to.deep.equal({ result: false, msg: "user was not found!" });
  });
  after(async () => {
    await UserModel.deleteOne({ passportNumber: "123499999" });
    await UserModel.deleteOne({ passportNumber: "123599999" });
  });
});
