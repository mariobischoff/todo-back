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
        let user = data
        delete user.password
        delete user.tasks
        cb(false, user)
      })
    },
    // Recuperar um usuário pelo ID
    getOne: (params, cb) => {
      User.findOne(params, (err, data) => {
        if (err) {
          cb(err)
          return
        }
        let user = data
        delete user.password
        delete user.tasks
        cb(false, user)
      })
    },
    // Listar todos usuários
    getAll: (cb) => {
      User.find({}, (err, data) => {
        if (err) {
          cb(err)
          return
        }
        data.filter((user) => {
          delete user.tasks
          delete user.password
        })
        cb(false, data)
      })
    },
    // Atualizar usuário
    update: (params, user, cb) => {
      User.findOneAndUpdate(params, user, (err, data) => {
        if (err) {
          cb(err)
          return
        }
        delete data.password
        delete data.tasks
        cb(false, data)
      })
    },
    // Excluir usuário
    delete: (params, cb) => {
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