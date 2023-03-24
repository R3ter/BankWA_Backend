import { signToken } from "../../../../auth/Token";
import UserModel from "../../../../models/UserModel";

export default async (
  _,
  { userData: { name, passportNumber, password } },
  context
) => {
  return await new UserModel({ name, passportNumber, password })
    .save()
    .then((e) => {
      return {
        token: signToken({
          username: passportNumber,
          id: e._id,
          name,
          role: "User",
        }),
        name,
        error: false,
      };
    })
    .catch((error) => {
      if (error.name == "MongoServerError" && error.code == 11000) {
        return {
          error: true,
          msg: "this passport number is already in data",
        };
      }
      if (error.name === "ValidationError")
        return {
          error: true,
          msg: error.errors[Object.keys(error.errors)[0]].message,
        };
    });
};
