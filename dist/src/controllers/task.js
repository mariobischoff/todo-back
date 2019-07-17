'use strict';

module.exports = function (app) {
  return {
    save: function save(req, res) {
      var task = {
        title: req.body.title,
        description: req.body.description,
        createdAt: Date.now(),
        doneAt: req.body.doneAt
      };
      app.src.models.task.addTask({ _id: res.locals.id }, task, function (err, data) {
        if (err) {
          res.status(401).send('Erro: ' + err);
          return;
        }
        res.json(data);
      });
    },
    list: function list(req, res) {
      if (req.params.id) {
        app.src.models.task.getOne({ _id: res.locals.id }, req.params.id, function (err, data) {
          if (err) {
            res.status(400).send('Erro: ' + err);
            return;
          }
          res.json(data);
          return;
        });
      } else {
        app.src.models.task.getAll({ _id: res.locals.id }, function (err, data) {
          if (err) {
            return res.status(400).send('Erro: ' + err);
          }
          return res.json(data);
        });
      }
    },
    update: function update(req, res) {
      if (!req.params.id) {
        res.status(400).send('Falta o parâmetro');
        return;
      }
      if (!req.body) {
        res.status(400).send('Envie os dados que deseja alterar');
        return;
      }
      app.src.models.task.update({ _id: res.locals.id }, req.params.id, req.body, function (err, data) {
        if (err) {
          return res.status(400).send('Erro: ' + err);
        }
        res.json(data);
      });
    },
    delete: function _delete(req, res) {
      if (!req.params.id) {
        res.status(400).send('Falta o parâmetro');
        return;
      }
      app.src.models.task.delete({ _id: res.locals.id }, req.params.id, function (err, data) {
        if (err) {
          return res.status(400).send('Erro: ' + err);
        }
        res.json(data);
      });
    }
  };
};