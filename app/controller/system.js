'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const packageJSON = require('../../package.json');
const { CODE_TEMPLATE_HEADER } = require('../const/code');

class SystemController extends Controller {
  // 获取系统配置
  async getProfile() {
    const { ctx, config } = this;

    console.log('config = ', config.server);
    // 获取代码模板package.json内容
    const codeTemplatePackageJSONFilePath = config.server.mode === 'prod' ?
      path.join(__dirname, '../../../template/package.json') :
      path.join(__dirname, '../../template/package.json');
    const codeTemplatePackageJSONFileData = JSON.parse(fs.readFileSync(codeTemplatePackageJSONFilePath, { encoding: 'utf-8' }));

    ctx.body = {
      publicKey: config.server.RSAKeyPair.publicKey,
      version: packageJSON.version,
      codeTemplatePackage: _.get(codeTemplatePackageJSONFileData, 'dependencies', {}),
      codeTemplateHeader: CODE_TEMPLATE_HEADER,
    };
  }
}

module.exports = SystemController;
