'use strict';

function wrapper(func) {
  return `
    const _ = require('lodash');

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
