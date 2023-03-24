const { signToken } = require("../auth/Token");
const users = require("../models/users");
const signup = async (req, res) => {
  const { username, name } = req.body;
  await new users({
    email: req.body.username,
    name: req.body.name,
    password: req.body.password,
  })
    .save()
    .then((e) => {
      const token = signToken({ username: e.email, id: e.id, name: e.name });
      res.cookie("token", token, { sameSite: "none", secure: true });
      res.json({
        token: token,
        error: false,
      });
    })
    .catch((error) => {
      if (error.name == "ValidationError") {
        return res.json({
          error: true,
          msg: "password is too short or email is incorrect!",
        });
      }

      if (error.name === "MongoServerError" && error.code === 11000) {
        return res.json({
          error: true,
          msg: "username already exists",
        });
      }
      res.json({
        error: true,
        msg: "internal server error",
      });
    });
};

module.exports = signup;
