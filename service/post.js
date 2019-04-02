const mongoose = require("mongoose");

const add = async (ctx, next) => {
  const { user_id } = ctx.state.user.data;
  const { title, content } = ctx.request.body;
  const Post = mongoose.model("Post");
  const post_id = (await Post.countDocuments()) + 1;
  const post = new Post({ title, content, user_id, post_id });
  await post.save();
};

const fetch = async (ctx, next) => {
  const { user_id } = ctx.state.user.data;
  const { offset, title } = ctx.query;
  const Post = mongoose.model("Post");
  let total = await Post.countDocuments();
  const data = await Post.find({ user_id, title: new RegExp(title) }, null, {
    skip: parseInt(offset)
  }).limit(10);
  if (title) total = data.length;
  return { data, pagation: { total } };
  //   return await Post.find({ user_id }).limit(parseInt(size));
};

const fetchOne = async (ctx, next) => {
  const { user_id } = ctx.state.user.data;
  const { post_id } = ctx.params;
  const Post = mongoose.model("Post");
  return await Post.findOne({ user_id, post_id });
};

const del = async (ctx, next) => {
  const { user_id } = ctx.state.user.data;
  const { post_id } = ctx.params;
  const Post = mongoose.model("Post");
  return await Post.deleteOne({ post_id, user_id });
};

const update = async (ctx, next) => {
  const { user_id } = ctx.state.user.data;
  const { post_id } = ctx.params;
  const { title, content } = ctx.request.body;
  const Post = mongoose.model("Post");
  return await Post.update(
    { post_id, user_id },
    { title, content, update_at: new Date() }
  );
};

module.exports = { add, fetch, del, fetchOne, update };
