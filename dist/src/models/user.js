'use strict';

var _user = require('../schemas/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
  return {
    // Registrar Usuário
    register: function register(user, cb) {
      _user2.default.create(user, function (err, data) {
        if (err) {
          cb(err);
          return;
        }
        cb(false, data);
      });
    },
    // Recuperar um usuário pelo ID
    getOne: function getOne(params, cb) {
      _user2.default.findOne(params, function (err, data) {
        if (err) {
          cb(err);
          return;
        }
        cb(false, data);
      });
    },
    // Listar todos usuários
    getAll: function getAll(cb) {
      _user2.default.find({}, function (err, data) {
        if (err) {
          cb(err);
          return;
        }
        cb(false, data);
      });
    },
    // Atualizar usuário
    update: function update(params, user, cb) {
      _user2.default.findOneAndUpdate(params, user, function (err, data) {
        if (err) {
          cb(err);
          return;
        }
        cb(false, data);
      });
    },
    // Excluir usuário
    delete: function _delete(params, cb) {
      _user2.default.remove(params, function (err, data) {
        if (err) {
          cb(err);
          return;
        }
        cb(false, data);
      });
    }
  };
};