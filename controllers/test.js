const fn_success = async (ctx, next) => {
  ctx.rest({
    data: 123
  });
};

const fn_error = async (ctx, next) => {
  ctx.appErr("发生错误");
};

module.exports = {
  "GET /api/success": fn_success,
  "GET /api/error": fn_error
};
