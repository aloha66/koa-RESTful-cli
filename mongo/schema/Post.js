const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  post_id: { unique: true, type: Number, required: true },
  user_id:{ unique: true, type: Number, required: true },
  title: {  type: String, required: true },
  content: { type: String, default: null },
  create_at: { type: Date, default: Date.now() },
  update_at: { type: Date, default: null }
});




mongoose.model("Post", postSchema);
