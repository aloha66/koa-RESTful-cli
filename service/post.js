const mongoose = require("mongoose");

const add = async (ctx,next) => {
    const {title,content,user_id} = ctx.request.body
    const Post = mongoose.model("Post");
    const post_id = (await Post.countDocuments()) + 1;
    const post = new Post({ title, content, user_id,post_id });
    post.save(); 
}

const fetch = async (ctx,next) => {
    const {title,content,user_id} = ctx.request.body
    const Post = mongoose.model("Post");
    return await Post.find();
}

const del = async (ctx,next) => {
    const {post_id} = ctx.params
    const Post = mongoose.model("Post");
    return await Post.remove({post_id});
}

module.exports = { add,fetch,del};