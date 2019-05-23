import User from '../schemas/user'

module.exports = app => {
  return {
    insert: (user, cb) => {
      User.create(user, (err, data) => {
        return cb(err, data)
      })
    },
    update: (params, user, cb) => {
      User.updateOne({_id: params}, user, cb)
    }
  }
}