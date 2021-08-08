'use strict';

const Controller = require('egg').Controller;

const wrapper = require('../libs/wrapper');

class CodeController extends Controller {
  async run() {
    const { ctx } = this;
    const { body } = ctx.request;
    const { code } = body;

    // eslint-disable-next-line no-eval
    const result = eval(wrapper(code));

    console.log('result = ', result);

    ctx.body = result;
  }
}

module.exports = CodeController;
