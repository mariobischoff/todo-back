'use strict';

var _user = require('../schemas/user');

var _user2 = _interopRequireDefault(_user);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
  return {
    // Adiciona tarefa
    addTask: function addTask(params, task, cb) {
      _user2.default.findOne(params, function (err, data) {
        if (err) {
          return cb(err);
        }
        data.tasks.push(task);
        _user2.default.findOneAndUpdate(params, { tasks: data.tasks }, { new: true }, function (err, result) {
          if (err) {
            return cb(err);
          }
          return cb(false, result);
        });
      });
    },
    // Atualiza tarefa
    update: function update(params, idTask, body, cb) {
      _user2.default.findById(params, function (err, data) {
        if (err) {
          cb(err);
          return;
        }
        data.tasks.filter(function (task) {
          if (task._id == idTask) {
            if (body.status) {
              task.status = body.status;
            }
            task.title = body.title;
            task.description = body.description;
          }
        });
        _user2.default.findOneAndUpdate(params, { tasks: data.tasks }, { new: true }, function (err, data) {
          if (err) {
            cb(err);
            return;
          }
          cb(null, data);
        });
      });
    },
    // Remove tarefa
    delete: function _delete(params, idTask, cb) {
      _user2.default.findById(params, function (err, data) {
        if (err) {
          cb(err);
          return;
        }
        data.tasks.filter(function (task, index, arr) {
          if (task._id == idTask) {
            arr.splice(index, 1);
          }
        });
        _user2.default.findByIdAndUpdate(params, { tasks: data.tasks }, { new: true }, function (err, data) {
          if (err) {
            cb(err);
            return;
          }
          cb(null, data);
        });
      });
    },
    // Recupera uma tarefa
    getOne: function getOne(params, idTask, cb) {
      var task = null;
      _user2.default.findOne(params, function (err, user) {
        if (err) {
          return cb(err);
        }
        task = user.tasks.filter(function (task) {
          return task._id == idTask;
        });
        user.tasks = task;
        cb(null, user);
      });
    },
    // Recupera todas as tarefas
    getAll: function getAll(params, cb) {
      _user2.default.findOne(params, function (err, user) {
        if (err) {
          return cb(err);
        }
        cb(null, user);
      });
    }
  };
};