import UserModel from "../../../../models/UserModel";

export default async (_, { userPassport, amount }) => {
  if (amount < 0) {
    return { result: false, msg: "amount cant be a negative number" };
  }
  return await UserModel.updateOne(
    { passportNumber: userPassport },
    { $set: { credit: amount } }
  )
    .then((e) => {
      if (e.matchedCount > 0) return { result: true, msg: "user updated!" };
      return { result: false, msg: "user was not found!" };
    })
    .catch(() => ({ result: false, msg: "Error!!" }));
};
