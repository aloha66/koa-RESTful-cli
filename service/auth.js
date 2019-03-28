const getToken = require("../utils/jwt");
const mongoose = require("mongoose");

const join = async (ctx, next) => {
  const { identifier, password } = ctx.request.body;
  const User = mongoose.model("User");
  const user = new User({ identifier, password });
  try {
    await user.save();
  } catch (error) {
    ctx.appErr(error);
  }
  return;
};

module.exports = { join };
