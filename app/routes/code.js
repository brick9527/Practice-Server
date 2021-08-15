'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.post('/api/code/run', controller.code.run);
};
