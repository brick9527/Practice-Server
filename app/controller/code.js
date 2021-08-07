'use strict';

const Controller = require('egg').Controller;

class CodeController extends Controller {
  async run() {
    const { ctx } = this;
    const { body } = ctx.request;

    ctx.body = 'hello ' + JSON.stringify(body);
  }
}

module.exports = CodeController;
