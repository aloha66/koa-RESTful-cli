const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  user_id: { unique: true, type: Number, required: true },
  username: { unique: true, type: String, required: true },
  password: { type: String, default: null },
  avatar: { type: String, default: null },
  role: { type: String, required: true, default: "user" },
  permission: { type: [], required: true, default: [] },
  create_at: { type: Date, default: Date.now() },
  last_signin_at: { type: Date, default: null }
});

userSchema.pre("save", function(next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

userSchema.methods = {
  //密码对比方法
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch);
        else reject(err);
      });
    });
  }
};

mongoose.model("User", userSchema);
