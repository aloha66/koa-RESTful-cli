const jsonwebtoken = require("jsonwebtoken");

const getToken = ctx => {
  return jsonwebtoken.sign(
    {
      data: { username: ctx.request.body.identifier, pkg: "111" },
      // 设置 token 过期时间
      exp: Math.floor(Date.now() / 1000) + 60 // 60 seconds * 60 minutes = 1 hour
    },
    process.env.SECRET
  );
};

module.exports = getToken;
