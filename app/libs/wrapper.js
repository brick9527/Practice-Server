'use strict';

function wrapper(func) {
  return `
    // 引入包
    const _ = require('lodash');
    const moment = require('moment');
    const dayjs = require('dayjs');
    const uuid = require('uuid');

    // 覆盖关键函数
    require = function() {
      return {};
    }


    const startTime = Date.now()

    function main(__dirname = '/', __filename = 'main', module = {}, exports = {}) {
      const global = this;
      const window = this;

      (function() {
        ${func}

        console.log('\\n[ 执行耗时:', Date.now() - startTime, 'ms ]');
      })()
    }

    main()
  `;
}

module.exports = wrapper;
