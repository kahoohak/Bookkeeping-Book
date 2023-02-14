'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret)

  router.post('/api/user/register', controller.user.register)
  router.post('/api/user/login', controller.user.login)
  router.post('/api/user/getUserInfo', _jwt, controller.user.getUserInfo)
  router.post('/api/user/editUserInfo', _jwt, controller.user.editUserInfo)
  router.post('/api/user/test', _jwt, controller.user.test)
  router.post('/api/upload', controller.upload.upload)
  // router.get('/', controller.home.index);
  // router.get('/user', controller.home.user);
  // router.post('/addUser', controller.home.addUser);
  // router.post('/editUser', controller.home.editUser);
  // router.post('/deleteUser', controller.home.deleteUser);
  // router.post('/add', controller.home.add)
};
