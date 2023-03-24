import { signToken } from "../../../../auth/Token";
import UserModel from "../../../../models/UserModel";

export default async (_, args, context) => {
  const user = await UserModel.findOne({
    email: args.loginData.username,
    password: args.loginData.password,
  });

  if (user) {
    const token = signToken({
      id: user._id,
      name: user.name,
      username: user.passportNumber,
      role: user.role,
    });
    context.res.cookie("token", token);
    return {
      name: user.name,
      error: false,
      token,
    };
  }
  return {
    error: true,
    msg: "username or password is incorrect",
  };
};
