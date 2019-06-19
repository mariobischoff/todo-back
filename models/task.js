import User from '../schemas/user'

module.exports = app => {
  return {
    // Adiciona tarefa
    addTask: (params, task, cb) => {
      User.findOne(params, (err, data) => {
        if (err) {
          cb(err)
          return
        }
        data.tasks.push(task)
        User.findOneAndUpdate(params, { tasks: data.tasks }, (err, outraCoisa) => {
          if (err) {
            cb(err)
            return
          }
          cb(false, outraCoisa)
        })
      })
    }
  }
}