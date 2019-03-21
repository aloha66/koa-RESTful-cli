const Koa = require("koa");
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

app.use(bodyParser());
app.use(restify());
app.use(unexpectedErr());
app.use(controller());

(async () => {
  await connect();
  initSchemas();
  console.timeEnd("初始化时间");
})();

app.listen(3000);
console.log("app started http://localhost:3000");
