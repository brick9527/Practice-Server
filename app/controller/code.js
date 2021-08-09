'use strict';

const Controller = require('egg').Controller;
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const wrapper = require('../libs/wrapper');

class CodeController extends Controller {
  async run() {
    const { ctx, config } = this;
    const { body } = ctx.request;
    const { code } = body;

    const filePath = path.join(config.templatePath, `${uuid()}.js`);
    fs.writeFileSync(filePath, wrapper(code), { flag: 'w+', encoding: 'utf-8' });

    const data = execFileSync('node', [ filePath ]);

    fs.unlink(filePath, err => {
      if (err) {
        console.error(err);
      }
    });

    console.log(data);

    ctx.body = data.toString();
  }
}

module.exports = CodeController;
