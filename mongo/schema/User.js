const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  identifier: { unique: true, type: String, required: true },
  password: { type: String, default: null },
  avatar: { type: String, default: null },
  role: { type: String, required: true, default: "user" },
  permission: { type: [], required: true, default: [] },
  create_at: { type: Date, default: Date.now() },
  last_signin_at: { type: Date, default: null }
});

mongoose.model("User", userSchema);
