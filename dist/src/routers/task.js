'use strict';

var _auth = require('../middleware/auth');

var _user = require('../validations/user');

var _task = require('../validations/task');

module.exports = function (app) {
  /**
   * ROUTE: /task
   * VERB: POST
   * PUBLIC: false
   */
  app.post('/task', _task.taskCreateValidator, _auth.verifyToken, function (req, res) {
    app.src.controllers.task.save(req, res);
  });
  /**
   * ROUTE: /task/:id?
   * VERB: GET
   * PUBLIC: false
   */
  app.get('/task/:id?', _auth.verifyToken, function (req, res) {
    app.src.controllers.task.list(req, res);
  });
  /**
   * ROUTE: /task/:id
   * VERB: PUT
   * PUBLIC: false
   */
  app.put('/task/:id', _user.tokenValidator, _user.idValidator, _task.taskAlterValidator, _auth.verifyToken, function (req, res) {
    app.src.controllers.task.update(req, res);
  });
  /**
   * ROUTE: /task/:id
   * VERB: DELETE
   * PUBLIC: false
   */
  app.delete('/task/:id', _user.tokenValidator, _user.idValidator, _auth.verifyToken, function (req, res) {
    app.src.controllers.task.delete(req, res);
  });
};