'use strict';

module.exports = {
  server: {
    host: '127.0.0.1',
    port: 7001,
    mode: process.env.EGG_SERVER_ENV, // dev: 开发环境；prod: 生产环境
  },
  code: {
    folderName: 'template',
  },
};
