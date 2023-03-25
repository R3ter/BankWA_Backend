import UserModel from "../../../../models/UserModel";
import checkUserActive from "../../../functions/checkUserActive";
import Deposit from "./Deposit";
import WithdrawMoney from "./WithdrawMoney";

export default async (_, { from, to, amount }) => {
  if (amount <= 0) {
    return { result: false, msg: "amount cant be negative or zero" };
  }
  const user = await UserModel.findOne({ passportNumber: from });
  const user1 = await UserModel.findOne({ passportNumber: to });
  if (!user) return { result: false, msg: "user was not found" };
  if (!user1) return { result: false, msg: "user was not found" };
  if (!(await checkUserActive(user1)) || !(await checkUserActive(user)))
    return { result: false, msg: "User is not active" };
  if (user.cash + user.credit < amount)
    return { result: false, msg: "user does not have enough cash or credit!" };

  const withdraw = WithdrawMoney(_, { userPassport: from, amount });
  const deposit = Deposit(_, { userPassport: to, amount });
  return Promise.all([withdraw, deposit])
    .then((e) => {
      if (e[1].result && e[0].result)
        return {
          result: true,
          msg: "transfer completed!",
        };
      return { result: false, msg: "Unknown error!" };
    })
    .catch(() => ({ result: false, msg: "Unknown error!" }));
};
