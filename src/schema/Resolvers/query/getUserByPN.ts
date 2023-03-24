import UserModel from "../../../../models/UserModel";
import graphqlFields from "graphql-fields";

export default async (_, args, _context, info) => {
  return await UserModel.findOne({
    passportNumber: args.passportNumber,
  }).select(Object.keys(graphqlFields(info)));
};
