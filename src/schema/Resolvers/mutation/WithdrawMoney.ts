import UserModel from "../../../../models/UserModel";
import checkUserActive from "../../../functions/checkUserActive";

export default async (_, { userPassport, amount }) => {
  if (amount <= 0) {
    return { result: false, msg: "amount cant be negative or zero" };
  }
  const user = await UserModel.findOne({ passportNumber: userPassport });
  if (!user) return { result: false, msg: "user was not found!" };
  if (!(await checkUserActive(user)))
    return { result: false, msg: "User is not active" };

  if (user.cash + user.credit < amount)
    return { result: false, msg: "user does not have enough cash or credit!" };

  const over = user.cash - amount;

  return await UserModel.updateOne(
    { passportNumber: userPassport },
    {
      $inc: {
        cash: over >= 0 ? -amount : -user.cash,
        credit: over < 0 ? (user.credit > -over ? over : -user.credit) : 0,
      },
    }
  )
    .then(() => ({ result: true, msg: "User updated!" }))
    .catch((e) => {
      return { result: false, msg: "Unexpected error!" };
    });
};
