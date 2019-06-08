import User from '../schemas/user'

module.exports = app => {
  return {
    // Registrar Usuário
    register: (user, cb) => {
      User.create(user, (err, data) => {
        if (err) {
          cb(err)
          return
        }
        cb(false, data)
      })
    },
    // Recuperar um usuário pelo ID
    getOne: (params, cb) => {
      User.findOne(params, (err, data) => {
        if (err) {
          cb(err)
          return
        }
        cb(false, data)
      })
    },
    // Listar todos usuários
    getAll: (cb) => {
      User.find({}, (err, data) => {
        if (err) {
          cb(err)
          return
        }
        cb(false, data)
      })

    },
    // Atualizar usuário
    update: (params, user) => {
      User.findOneAndUpdate(params, user, (err, data) => {
        if (err) {
          cb(err)
          return
        }
        cb(false, data)
      })
    },
    // Excluir usuário
    delete: (params) => {
      User.remove(params, (err, data) => {
        if (err) {
          cb(err)
          return
        }
        cb(false, data)
      })
    }
  }
}