const consumeInitTime = async (ctx, next) => {
  console.time();
  await next();
  console.timeEnd("初始化时间");
};

module.exports = consumeInitTime;
