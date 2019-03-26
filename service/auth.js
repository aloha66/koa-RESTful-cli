const getToken = require("../utils/jwt");

const login = async (ctx, next) => {
  const data = {
    username: "111",
    token: getToken(ctx)
  };
  return data;
};
module.exports = { login };
