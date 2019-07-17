'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _define = require('../define');

var _define2 = _interopRequireDefault(_define);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  verifyToken: function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
      res.status(400).send('Missing token');
      return;
    }
    var token = req.headers.authorization;
    _jsonwebtoken2.default.verify(token, _define2.default.SHA, function (err, decoded) {
      if (err) {
        console.log('token invalido');
        res.status(401).send('Token invalid');
        return;
      }
      res.locals.id = decoded.sub;
      next();
    });
  }
};