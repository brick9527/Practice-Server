/* eslint valid-jsdoc: "off" */

'use strict';

const _ = require('lodash');
const path = require('path');

const localConfig = require('./config.local');
const sampleConfig = require('./config.sample');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    security: {
      csrf: {
        enable: false,
      },
    },
  };

  const customeConfig = _.defaults(localConfig, sampleConfig);

  config.keys = appInfo.name + '_1628326593647_4881';

  config.middleware = [];

  const userConfig = {
    // myAppName: 'egg',
    cluster: {
      listen: {
        port: customeConfig.server.port,
        hostname: customeConfig.server.host,
      },
    },
    // 代码模板文件存储位置
    templatePath: path.join(__dirname, '../', customeConfig.server.mode === 'prod' ? '../' : '', customeConfig.code.folderName),
  };

  console.log(__dirname, customeConfig.server.mode, userConfig.templatePath);

  return {
    ...config,
    ...userConfig,
  };
};
