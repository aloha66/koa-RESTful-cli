## koa-RESTful-cli

## Build Setup

```bash
# 安装依赖
npm i

# 开发环境
$ npm run dev

# 生产环境
$ npm run build

# 测试环境
$ npm run test
```

## Todos 更新记录

- ~~自动导入 controllers~~
- ~~自动导入 schema~~
- ~~配置环境变量~~
- ~~RESTful 返回数据处理~~
- ~~jwt 身份验证~~
- ~~刷新 token~~
- ~~登录注册模块~~
- ~~上传模块~~
- 日志模块
- 更新路由模块 joi-router

## TODO 学习

- token 原理
- 鉴权机制
- mongoose

## 目录结构

```
koa-RESTful-cli/
   |
   config/                      * 通用配置
   |
   ├──mongo/                    * mongodb相关
   │   │
   │   │──schema                * schema
   │   │
   │   └──db.js                 * 初始化mongodb
   │
   │
   │──middleware/               * koa.js中间件
   |
   ├──controllers/              * 控制器
   │
   ├──utils/                    * 工具类
   |
   │──service/                  * 业务层（TODO）
   │
   │──package.json              * 包信息
   │
   │──.env*                     * 环境变量
   │
   │──.gitignore                * Git忽略文件配置
   │
   │──app.js                    * koa.js程序入口文件
   │
   └──README.md                 * README.md
```
