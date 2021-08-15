'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/api/system/profile', controller.system.getProfile);
};
