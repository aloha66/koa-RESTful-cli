const fs = require("fs");
const path = require("path");
const {
  cleanAndInitRouterRecord,
  appendDataIntoRecord
} = require("../utils/utils");

function addMapping(router, mapping, dir, file) {
  // 按路由文件划分记录
  appendDataIntoRecord(dir, `\n${file}  =================\n`, "routes.log");
  for (const url in mapping) {
    // 添加路由到文件作为记录
    appendDataIntoRecord(dir, url + "\n", "routes.log");
    // url是'GET /path'
    if (url.startsWith("GET ")) {
      const path = url.substring(4);
      router.get(path, mapping[url]);
      // console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith("POST ")) {
      const path = url.substring(5);
      router.post(path, mapping[url]);
      // console.log(`register URL mapping: POST ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}

function addControllers(router, dir) {
  // 初始化记录路由记录文件
  cleanAndInitRouterRecord(dir, "routes.log");
  // 同步读取文件并过滤js文件
  const files = fs.readdirSync(path.join(__dirname, "../", dir));
  const js_files = files.filter(f => f.endsWith(".js"));

  for (const f of js_files) {
    // console.log(`process controller ${f} ...`);
    const mapping = require(path.join(__dirname, "../", dir, f));
    // 当前mapping格式
    // {'GET /path' : Function}
    addMapping(router, mapping, dir, f);
  }
}

module.exports = function(dir = "controllers") {
  const router = require("koa-router")();
  addControllers(router, dir);
  // 初始化路由
  return router.routes();
};
