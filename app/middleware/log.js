'use strict';

module.exports = () => {
  return async function log(ctx, next) {
    const { request } = ctx;
    let reqBody = {};
    try {
      reqBody = JSON.stringify(request.body);
    } catch (err) {
      ctx.logger.error(err);
    }

    ctx.logger.info(reqBody);

    await next();

    const { response } = ctx;
    let resBody = {};
    try {
      resBody = JSON.stringify(response.body);
    } catch (err) {
      ctx.logger.error(err);
    }

    ctx.logger.info(resBody);
  };
};
