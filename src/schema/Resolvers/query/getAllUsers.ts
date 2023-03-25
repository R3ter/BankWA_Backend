import { GraphQLResolveInfo } from "graphql";
import UserModel from "../../../../models/UserModel";
import graphqlFields from "graphql-fields";
export default async (
  _,
  { sortBy, filter, onlyActive },
  _context,
  info: GraphQLResolveInfo
) => {
  const sort = {};

  sort[sortBy] = -1;
  return await UserModel.find({
    $and: [
      { ...(onlyActive ? { active: true } : {}) },
      {
        ...(filter?.starts != undefined && filter?.ends
          ? {
              cash: { $gt: filter?.starts, $lt: filter?.ends },
            }
          : {}),
      },
    ],
  })
    .select(Object.keys(graphqlFields(info)))
    .sort(sort);
};
