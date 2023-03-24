import UserModel from "../../../../models/UserModel";
import Deposit from "./Deposit";
import WithdrawMoney from "./WithdrawMoney";

export default async (_, { from, to, amount }) => {
  if (amount < 0) {
    return { result: false, msg: "amount cant be a negative number" };
  }
  const user = await UserModel.findOne({ passportNumber: from });
  if (!user) return { result: false, msg: "user was not found" };
  if (user.cash + user.credit < amount)
    return { result: false, msg: "user does not have enough cash or credit!" };

  const withdraw = WithdrawMoney(_, { userPassport: from, amount });
  const deposit = Deposit(_, { userPassport: to, amount });
  return Promise.all([withdraw, deposit])
    .then(() => ({
      result: true,
      msg: "transfer completed!",
    }))
    .catch(() => ({ result: false, msg: "Unknown error!" }));
};
