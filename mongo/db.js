const mongoose = require("mongoose");
const glob = require("glob");
const path = require("path");
const fs = require("fs");

const {
  mongodb: { url }
} = require("../config/config");

const {
  cleanAndInitRouterRecord,
  appendDataIntoRecord
} = require("../utils/utils");

// 消除警告
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const connect = () => {
  //连接数据库
  mongoose.connect(url);
  let maxConnectTimes = 0;
  return new Promise((resolve, reject) => {
    //把所有连接放到这里
    //增加数据库监听事件
    mongoose.connection.on("disconnected", () => {
      console.log("***********数据库断开***********");
      if (maxConnectTimes < 3) {
        maxConnectTimes++;
        mongoose.connect(url);
      } else {
        reject();
        throw new Error("数据库出现问题，程序无法搞定，请人为修理......");
      }
    });
    mongoose.connection.on("error", err => {
      console.log("***********数据库错误***********");
      if (maxConnectTimes < 3) {
        maxConnectTimes++;
        mongoose.connect(url);
      } else {
        reject(err);
        throw new Error("数据库出现问题，程序无法搞定，请人为修理......");
      }
    });
    //链接打开的时
    mongoose.connection.once("open", () => {
      console.log("MongoDB connected successfully");
      resolve();
    });
  });
};

const initSchemas = () => {
  cleanAndInitRouterRecord("mongo", "schema.log");
  glob.sync(path.join(__dirname, "schema", "*.js")).forEach(item => {
    require(item);
    const filename = item.substring(item.lastIndexOf("/") + 1);
    appendDataIntoRecord("mongo", filename + "\n", "schema.log");
  });
};

module.exports = { connect, initSchemas };
