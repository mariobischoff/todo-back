'use strict';

var _auth = require('../middleware/auth');

var _user = require('../validations/user');

// import upload from '../validations/upload'

module.exports = function (app) {
  /**
   * ROUTE: /user/register
   * VERB: POST
   * PUBLIC: true
   */
  app.post('/user/register', _user.userCreateValidator, function (req, res) {
    app.src.controllers.user.save(req, res);
  });
  /**
   * ROUTE: /user/login
   * VERB: POST
   * PUBLIC: true
   */
  app.post('/user/login', _user.userLoginValidator, function (req, res) {
    app.src.controllers.user.login(req, res);
  });
  /**
   * ROUTE: /user/id?
   * VERB: GET
   * PUBLIC: false
   */
  app.get('/user/:id?', _user.tokenValidator, _user.idOptionalValidator, _auth.verifyToken, function (req, res) {
    app.src.controllers.user.list(req, res);
  });
  /**
   * ROUTE: /user/id
   * VERB: PUT
   * PUBLIC: false
   */
  app.put('/user/:id', _user.tokenValidator, _user.userAlterValidator, _user.idValidator, _auth.verifyToken, function (req, res) {
    app.src.controllers.user.update(req, res);
  });
  /**
   * ROUTE: /user/id
   * VERB: DELETE
   * PUBLIC: false
   */
  app.delete('/user/:id', _user.tokenValidator, _user.idValidator, _auth.verifyToken, function (req, res) {
    app.src.controllers.user.delete(req, res);
  });
};