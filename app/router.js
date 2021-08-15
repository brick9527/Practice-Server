'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./routes/code')(app);
  require('./routes/system')(app);
};
