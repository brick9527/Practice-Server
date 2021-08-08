'use strict';

const Controller = require('egg').Controller;
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const wrapper = require('../libs/wrapper');

class CodeController extends Controller {
  async run() {
    const { ctx } = this;
    const { body } = ctx.request;
    const { code } = body;

    const filePath = path.join(__dirname, `../../temp/js_${uuid()}.js`);
    fs.writeFileSync(filePath, wrapper(code), { flag: 'w+', encoding: 'utf-8' });

    const data = execFileSync('node', [ filePath ]);

    fs.unlink(filePath, err => {
      if (err) {
        console.error(err);
      }
    });

    ctx.body = data.toString();
  }
}

module.exports = CodeController;
