/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');
const fs = require('fs');
const { load } = require('js-yaml');
const objectMerge = require('fd-object-merge');

const sampleConfig = require('./config.sample');

// 自动获取本地配置
let localConfig = {};
const localConfigPath = path.join(__dirname, '../config.yml');
if (fs.existsSync(localConfigPath)) {
  const configData = fs.readFileSync(localConfigPath, { encoding: 'utf-8' });
  localConfig = load(configData) || {};
}

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  const customeConfig = objectMerge(localConfig, sampleConfig);

  const config = (exports = {
    security: {
      csrf: {
        enable: false,
      },
    },

    ...customeConfig,
  });


  config.logger = {
    dir: path.join(__dirname, '../logs'), // 日志目录
    consoleLevel: customeConfig.server.mode === 'prod' ? 'INFO' : 'DEBUG', // 终端输出等级
    disableConsoleAfterReady: false, // 打开日志终端输出
  };

  config.keys = appInfo.name + '_1628326593647_4881';

  config.middleware = [ 'log' ];

  const userConfig = {
    myAppName: customeConfig.server.name,
    cluster: {
      listen: {
        port: customeConfig.server.port,
        hostname: customeConfig.server.host,
      },
    },
    // 代码模板文件存储位置
    templatePath: path.join(
      __dirname,
      '../',
      customeConfig.server.mode === 'prod' ? '../' : '',
      customeConfig.code.folderName
    ),
  };

  return {
    ...config,
    ...userConfig,
  };
};
