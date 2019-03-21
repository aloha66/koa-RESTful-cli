const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  user_name: { unique: true, type: String },
  create_at: { type: Date, default: Date.now() }
});

mongoose.model("User", userSchema);
