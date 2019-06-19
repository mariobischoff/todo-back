import jwt from 'jsonwebtoken'

module.exports = app => {
  return {
    save: (req, res) => {
      if (!req.body.title || !req.body.description) {
        res.status(401).send('Dados incompletos')
        return
      }
      const task = { title: req.body.title, description: req.body.description, createdAt: Date.now() }
      app.models.task.addTask({ _id: res.locals.id }, task, (err, data) => {
        if (err) {
          res.status(401).send('Erro: ' + err)
          return
        }
        res.json(data)
      })
    }
  }
}