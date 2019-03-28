const getToken = require("../utils/jwt");
const mongoose = require("mongoose");

const join = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const User = mongoose.model("User");
  const user_id = (await User.countDocuments()) + 1;
  const user = new User({ username, password, user_id });
  await user.save();
  return;
};

const login = async (ctx, next) => {
  // 判断用户名和密码
  const { username, password } = ctx.request.body;
  const User = mongoose.model("User");
  const user = await User.findOne({ username });
  if (!user) return ctx.appErr("用户名或密码不正确");
  const result = await new User().comparePassword(password, user.password);
  if (!result) return ctx.appErr("用户名或密码不正确");
  // 修改登录时间
  const now = new Date();
  User.update({ username }, { last_signin_at: now });

  const data = {
    user_id: user.user_id,
    avatar: user.avatar,
    last_signin_at: now,
    username,
    permission: user.permission,
    // role: user.role,
    token: getToken()
  };
  return data;
};
module.exports = { join, login };
