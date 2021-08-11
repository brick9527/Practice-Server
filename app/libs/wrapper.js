'use strict';

const { CODE_TEMPLATE_HEADER } = require('../const/code');

function wrapper(func) {
  return `
    // 引入包
    ${CODE_TEMPLATE_HEADER}

    /**
     * 覆盖危险变量
     */
    require = function () {
      return {};
    }

    const eval = function (...args) {
      return args;
    }

    process = {};

    function main(__dirname = '/', __filename = 'main', module = {}, exports = {}) {
      const global = this;
      const window = this;

      (function() {
        const startTime = Date.now()
        
        try {
          ${func}
        } catch (err) {
          console.log(err.name + ': ' + err.message);
        }

        console.log('\\n[ 执行耗时:', Date.now() - startTime, 'ms ]');
      })()
    }

    main()
  `;
}

module.exports = wrapper;
