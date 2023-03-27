import jwt from "jsonwebtoken";

const signToken = ({ username, name, id, role }) => {
  console.log(`username: ${username}`);
  console.log(`id: ${id}`);
  console.log(`name: ${name}`);
  if (!username || !id) {
    throw new Error("data is not provided correctly");
  }
  return jwt.sign(
    { username, name, id, role },
    process.env.SECRET || "dwadawdwadadwdwaawd"
  );
};

const checkToken = (token, role = ["user"]) => {
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SECRET || "dwadawdwadadwdwaawd");
  } catch (e) {
    throw new Error("Token is not valid");
  }
  if (!role.includes(decoded.role)) {
    throw new Error("user is not authorized");
  }
  return true;
};

export { signToken, checkToken };
