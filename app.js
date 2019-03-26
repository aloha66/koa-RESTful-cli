const Koa = require("koa");
const jwt = require("koa-jwt");
const bodyParser = require("koa-bodyparser");
const controller = require("./middlewares/controller");
const { restify, unexpectedErr } = require("./middlewares/rest");
console.time("初始化时间");
// 注入当前环境
// 不是很优雅的解决方案
if (process.argv[2]) {
  require("dotenv").config({ path: `.env.${process.argv[2]}` });
} else {
  // dev环境的NODE_ENV默认是undefined
  require("dotenv").config();
}

const { connect, initSchemas } = require("./mongo/db");

const app = new Koa();

// 中间件顺序不能错  body解析 => rest错误提示 => jwt => rest请求处理 => 加载路由
app.use(bodyParser());
app.use(unexpectedErr());
app.use(
  jwt({ secret: process.env.SECRET }).unless({
    path: [/^\/public/, /^\/api\/auth\/login/, /^\/api\/auth\/join/]
  })
);
app.use(restify());

app.use(controller());

(async () => {
  await connect();
  initSchemas();
  console.timeEnd("初始化时间");
})();

app.listen(3000);
console.log("app started http://localhost:3000");
