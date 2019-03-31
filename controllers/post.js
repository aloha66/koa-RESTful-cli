const post = require("../service/post");
const fn_add_post = async(ctx,next) => {
    const result = await post.add(ctx)
    ctx.rest()
}

const fn_fetch_post = async(ctx,next) => {
    const result = await post.fetch(ctx)
    ctx.rest(result)
}

const fn_del_post = async(ctx,next) => {
    const result = await post.del(ctx)
    ctx.rest(result)
}

module.exports = {
    "POST /api/post/add": fn_add_post,
    "GET /api/posts": fn_fetch_post,
    "GET /api/post/del/:post_id": fn_del_post,
}