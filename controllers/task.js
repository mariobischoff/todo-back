module.exports = app => {
  return {
    save: (req, res) => {
      if (!req.body.title || !req.body.description) {
        res.status(401).send('Dados incompletos')
        return
      }
      const task = { title: req.body.title, description: req.body.description, createdAt: Date.now() }
      console.log(res.locals.id)
      app.models.task.addTask({ _id: res.locals.id }, task, (err, data) => {
        if (err) {
          res.status(401).send('Erro: ' + err)
          return
        }
        res.json(data)
      })
    },
    list: (req, res) => {
      if (req.params.id) {
        app.models.task.getOne({ _id: res.locals.id }, { idTask: req.params.id }, (err, data) => {
          if (err) {
            return res.status(400).send('Erro: ' + err)
          }
          return res.json(data)
        })
      } else {
        app.models.task.getAll({ _id: res.locals.id }, (err, data) => {
          if (err) {
            return res.status(400).send('Erro: ' + err)
          }
          return res.json(data)
        })
      }
    }
  }
}
