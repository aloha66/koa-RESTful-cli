const getToken = require("../utils/jwt");

function APIException(msg, code) {
  this.code = code;
  this.msg = msg;
}

module.exports = {
  unexpectedErr() {
    return async (ctx, next) => {
      ctx.appErr = (msg = "", code = 0) => {
        throw new APIException(msg, code);
      };
      await next().catch(e => {
        ctx.response.status = e.status || 400;
        ctx.response.body = {
          code: e.code || e.status || 0,
          msg: e.msg || e.message,
          time: null
        };
      });
    };
  },
  restify(pathPrefix = "/api/") {
    return async (ctx, next) => {
      if (ctx.request.path.startsWith(pathPrefix)) {
        // 如果存在token，检测时间并刷新
        let token;
        if (ctx.state.user) {
          const exp = ctx.state.user.exp * 1000;
          if (exp - Date.now() < 30000) {
            // 与过期时间相比 差30s刷新token
            token = getToken(ctx);
          }
        }

        ctx.response.type = "application/json";
        ctx.rest = (data, msg = "") => {
          ctx.response.body = {
            data,
            msg,
            code: 1,
            time: null,
            token
          };
        };
        await next();
      } else {
        await next();
      }
    };
  }
};
