'use strict';

function wrapper(func) {
  return `
    const _ = require('lodash');

    function main(__dirname = '/', __filename = 'main', module = {}, exports = {}) {
      const global = this;
      const window = this;

      (function() {
        ${func}
      })()
    }

    main()
  `;
}

module.exports = wrapper;
