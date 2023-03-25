import UserModel from "../../../../models/UserModel";

export default async (_, { userPassport, active }) => {
  return await UserModel.updateOne(
    { passportNumber: userPassport },
    { $set: { active } }
  ).then((e) => {
    return active;
  });
};
