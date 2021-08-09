'use strict';

module.exports = {
  server: {
    host: '0.0.0.0',
    port: 3000,
    mode: process.env.EGG_SERVER_ENV, // dev: 开发环境；prod: 生产环境
  },
  code: {
    folderName: 'template',
  },
};
