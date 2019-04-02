const post = require("../service/post");
const fn_add_post = async (ctx, next) => {
  const result = await post.add(ctx);
  ctx.rest();
};

const fn_fetch_post = async (ctx, next) => {
  const { data, pagation } = await post.fetch(ctx);
  ctx.rest(data, "", pagation);
};

const fn_fetch_one_post = async (ctx, next) => {
  const result = await post.fetchOne(ctx);
  ctx.rest(result);
};

const fn_del_post = async (ctx, next) => {
  const result = await post.del(ctx);
  ctx.rest(result);
};

const fn_update_post = async (ctx, next) => {
  const result = await post.updateOne(ctx);
  ctx.rest(result);
};

module.exports = {
  "POST /api/post/add": fn_add_post,
  "GET /api/posts": fn_fetch_post,
  "GET /api/post/del/:post_id": fn_del_post,
  "GET /api/post/:post_id": fn_fetch_one_post,
  "POST /api/post/update/:post_id": fn_update_post
};
