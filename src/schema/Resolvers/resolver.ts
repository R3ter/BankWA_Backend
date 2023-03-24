import AddAccount from "./mutation/AddAccount";
import Deposit from "./mutation/Deposit";
import EditCredit from "./mutation/EditCredit";
import login from "./mutation/login";
import Transfer from "./mutation/Transfer";
import WithdrawMoney from "./mutation/WithdrawMoney";
import getAllUsers from "./query/getAllUsers";
import getUserByPN from "./query/getUserByPN";

export default {
  Query: {
    getAllUsers: getAllUsers,
    getUserByPN: getUserByPN,
  },
  Mutation: {
    login: login,
    addAccount: AddAccount,
    Deposit: Deposit,
    editCredit: EditCredit,
    WithdrawMoney: WithdrawMoney,
    Transfer: Transfer,
  },
};
