'use strict';

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _define = require('../define');

var _define2 = _interopRequireDefault(_define);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
  return {
    save: function save(req, res) {
      // verifica se as senhas são iguais
      if (req.body.password !== req.body.repassword) {
        res.status(401).send('Senhas diferentes');
        return;
      }
      // hash do password
      _bcrypt2.default.genSalt(10, function (error, salt) {
        _bcrypt2.default.hash(req.body.password, salt, function (error, hash) {
          req.body.password = hash;
          delete req.body.repassword;
          // importar model
          // req.body.avatar = req.file.destination + '/' + req.file.filename
          // delete req.file
          app.src.models.user.register(req.body, function (err, data) {
            if (err) {
              res.status(401).send('Erro: ' + err);
              return;
            }
            res.json(data);
          });
        });
      });
    },
    login: function login(req, res) {
      // verificar se os campos foram preenchidos
      if (!req.body.email || !req.body.password) {
        res.status(401).send('Falta dados');
        return;
      }
      // verificar se existe o email cadastrado
      app.src.models.user.getOne({ email: req.body.email }, function (err, data) {
        if (err) {
          res.send('Erro: ' + err);
          return;
        }
        if (data) {
          // verificar senha
          _bcrypt2.default.compare(req.body.password, data.password, function (err, same) {
            if (err) {
              res.status(400).send('Erro: ' + err);
              return;
            }
            if (same) {
              // gera o token
              var token = _jsonwebtoken2.default.sign({ sub: data._id }, _define2.default.SHA, { expiresIn: 60 * 60 });
              res.status(200).send({ token: token });
            } else {
              res.status(400).send('Senha invalida');
            }
          });
        }
      });
    },
    update: function update(req, res) {
      // verificar parametro
      if (!req.params.id) {
        res.status(400).send('Falta o parâmentro');
        return;
      }
      // verificar campos obrigatorios
      if (!req.body) {
        res.status(400).send('Envie os dados que deseja alterar');
        return;
      }
      // importar o model
      app.src.models.user.update({ _id: req.params.id }, req.body, function (err, data) {
        if (err) {
          res.status(400).send('Erro: ' + err);
          return;
        }
        res.json(data);
        return;
      });
      // verificar token
    },
    list: function list(req, res) {
      // verificar se foi passado parametro
      if (req.params.id) {
        // importar model        
        app.src.models.user.getOne({ _id: req.params.id }, function (err, data) {
          if (err) {
            res.status(400).send('Erro: ' + err);
            return;
          }
          res.json(data);
          return;
        });
      } else {
        // importar model
        app.src.models.user.getAll(function (err, data) {
          if (err) {
            res.status(400).send('Erro: ' + err);
            return;
          }
          res.json(data);
          return;
        });
      }
      // verificar token
    },
    delete: function _delete(req, res) {
      // verificar parametro
      if (!req.params.id) {
        res.status(400).send('Falta o parâmentro');
        return;
      }
      // importar model
      app.src.models.user.delete({ _id: req.params.id }, function (err, data) {
        if (err) {
          res.status(400).send('Erro: ' + err);
          return;
        }
        res.json(data);
        return;
      });
    }
  };
};