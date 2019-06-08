import bcrypt from 'bcrypt'
<<<<<<< HEAD
import User from '../schemas/user'
=======
>>>>>>> 1940528ff63150d8079fd009e3a4fbb976c1f251

module.exports = app => {
  return {
    save: (req, res) => {
      // verifica se os campos foram digitados
      if (!req.body.name || !req.body.email || !req.body.password || !req.body.repassword) {
        res.status(401).send('Dados incompletos')
        return
      }
      // verifica se as senhas são iguais
      if (req.body.password !== req.body.repassword) {
        res.status(401).send('Senhas diferentes')
        return
      }
      // hash do password
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(req.body.password, salt, (error, hash) => {
          req.body.password = hash
          delete req.body.repassword
          // importar model
          app.models.user.register(req.body, (err, data) => {
            if (err) {
              res.status(401).send('Erro: ' + err)
              return
            }
            res.json(data)
          })
        })
      })
    },
    update: () => {
      // verificar campos obrigatorios
      // verificar parametro
      // verificar token
      // importar o model
    },
    list: (req, res) => {
      // verificar se foi passado parametro
      if (req.params.id) {
        // importar model        
        app.models.user.getOne({_id: req.params.id}, (err, data) => {
          if (err) {
            res.status(400).send('Erro: ' + err)
            return
          }
          res.json(data)
          return
        })
        // importar model
        app.models.user.getAll((err, data) => {
          if (err) {
            res.status(400).send('Erro: ' + err)
            return
          }
          res.json(data)
          return
        })
      }
      // verificar token
    },
    delete: () => {
      // verificar parametro
      // verificar token
      // importar model
    }
  }
}