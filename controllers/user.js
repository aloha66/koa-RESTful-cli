const fn_users = async (ctx, next) => {
  ctx.rest([
    { username: "aloha", mobile: "10086" },
    { username: "bruce", mobile: "10010" }
  ]);
};

const fn_userById = async (ctx, next) => {
  ctx.rest({ username: "aloha", mobile: "10086" });
};

module.exports = {
  "GET /api/users": fn_users,
  "GET /api/user/:id": fn_userById
};
