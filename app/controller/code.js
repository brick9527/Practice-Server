'use strict';

const Controller = require('egg').Controller;
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const wrapper = require('../libs/wrapper');
const { CODE_TEMPLATE_HEADER } = require('../const/code');

class CodeController extends Controller {
  // 运行代码
  async run() {
    const { ctx, config } = this;
    const { body } = ctx.request;
    const { code } = body;

    const filePath = path.join(config.templatePath, `${uuid()}.js`);
    fs.writeFileSync(filePath, wrapper(code), { flag: 'w+', encoding: 'utf-8' });

    try {
      const data = execFileSync('node', [ filePath ]);
      ctx.body = data.toString();
    } catch (err) {
      const simplifyErr = err.message.split('\n').filter(content => /.+?Error: /.test(content));
      ctx.body = simplifyErr.join('\n') + '\n';
      ctx.logger.error(err);
    } finally {
      fs.unlink(filePath, err => {
        if (err) {
          console.error(err);
        }
      });
    }
  }

  // 获取引用第三方模块的相关代码
  async getRequireCode() {
    const { ctx } = this;

    ctx.body = { code: CODE_TEMPLATE_HEADER };
  }
}

module.exports = CodeController;
