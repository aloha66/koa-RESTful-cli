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
      await next();
    };
  },
  restify(pathPrefix = "/api/") {
    return async (ctx, next) => {
      if (ctx.request.path.startsWith(pathPrefix)) {
        ctx.response.type = "application/json";
        ctx.rest = (data, msg = "") => {
          ctx.response.body = {
            data,
            msg,
            code: 1,
            time: null
          };
        };
        try {
          await next();
        } catch (e) {
          ctx.response.status = 400;
          ctx.response.body = {
            code: e.code,
            msg: e.msg,
            time: null
          };
        }
      } else {
        await next();
      }
    };
  }
};
