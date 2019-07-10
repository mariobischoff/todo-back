import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import define from '../define'

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
    login: (req, res) => {
      // verificar se os campos foram preenchidos
      if (!req.body.email || !req.body.password) {
        res.status(401).send('Falta dados')
        return
      }
      // verificar se existe o email cadastrado
      app.models.user.getOne({ email: req.body.email }, (err, data) => {
        if (err) {
          res.send('Erro: ' + err)
          return
        }
        if (data) {
          // verificar senha
          bcrypt.compare(req.body.password, data.password, (err, same) => {
            if (err) {
              res.status(400).send('Erro: ' + err)
              return
            }
            if (same) {
              // gera o token
              const token = jwt.sign({ sub: data._id }, define.SHA, { expiresIn: 60 * 60 })
              res.status(200).send({ token })
            } else {
              res.status(400).send('Senha invalida')
            }
          })
        }
      })
    },
    update: (req, res) => {
      // verificar parametro
      if (!req.params.id) {
        res.status(400).send('Falta o parâmentro')
        return
      }
      // verificar campos obrigatorios
      if (!req.body) {
        res.status(400).send('Envie os dados que deseja alterar')
        return
      }
      // importar o model
      app.models.user.update({ _id: req.params.id }, req.body, (err, data) => {
        if (err) {
          res.status(400).send('Erro: ' + err)
          return
        }
        res.json(data)
        return
      })
      // verificar token
    },
    list: (req, res) => {
      // verificar se foi passado parametro
      if (req.params.id) {
        // importar model        
        app.models.user.getOne({ _id: req.params.id }, (err, data) => {
          if (err) {
            res.status(400).send('Erro: ' + err)
            return
          }
          res.json(data)
          return
        })
      } else {
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
    delete: (req, res) => {
      // verificar parametro
      if (!req.params.id) {
        res.status(400).send('Falta o parâmentro')
        return
      }
      // importar model
      app.models.user.delete({ _id: req.params.id }, (err, data) => {
        if (err) {
          res.status(400).send('Erro: ' + err)
          return
        }
        res.json(data)
        return
      })
    }
  }
}