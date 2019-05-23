import bcrypt from 'bcrypt'

module.exports = app => {
  return {
    save: (req, res) => {
      if (req.body.password === req.body.password2) {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            res.send('error: ' + err)
          }
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) res.send('error: ' + err)
            delete req.body.password2
            req.body.password = hash
            app.models.user.insert(req.body, (err, data) => {
              if (err) res.send('error: ' + err)
              res.json(data)
            })
          })
        })
      }

      // verificar password com password2
      // verificar campos obrigatorios
      // hash do password
      // importar model
    },
    update: () => {
      // verificar campos obrigatorios
      // verificar parametro
      // verificar token
      // importar o model
    },
    list: () => {
      // verificar se foi passado parametro
      // verificar token
      // importar model
    },
    delete: () => {
      // verificar parametro
      // verificar token
      // importar model
    }
  }
}