const { upload } = require("../service/upload");

const fn_upload = async (ctx, next) => {
  const result = await upload(ctx, next);
  ctx.rest(result);
};
module.exports = {
  "POST /api/upload": fn_upload
};
