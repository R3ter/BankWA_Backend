import UserModel, { IUser } from "../../models/UserModel";

export default async (user: string | IUser): Promise<boolean> => {
  if (typeof user == "string") {
    return await UserModel.findOne({ passportNumber: user }).then(
      (e) => e.active
    );
  } else {
    return user.active;
  }
};
