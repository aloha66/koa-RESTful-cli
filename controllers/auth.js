const auth = require("../service/auth");

const fn_login = async (ctx, next) => {
  const result = await auth.login(ctx, next);
  ctx.rest(result);
};
const fn_join = async (ctx, next) => {
  const result = await auth.join(ctx, next);
  ctx.rest(result);
};
module.exports = {
  "POST /api/auth/login": fn_login,
  "POST /api/auth/join": fn_join
};
