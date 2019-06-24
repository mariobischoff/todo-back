import User from '../schemas/user'
import _ from 'lodash'

module.exports = app => {
  return {
    // Adiciona tarefa
    addTask: (params, task, cb) => {
      User.findOne(params, (err, data) => {
        if (err) {
          return cb(err)
        }
        data.tasks.push(task)
        User.findOneAndUpdate(params, { tasks: data.tasks }, (err, result) => {
          if (err) {
            return cb(err)
          }
          return cb(false, result)
        })
      })
    },
    getOne: (params, idTask, cb) => {
      User.findOne(params, (err, data) => {
        if (err) {
          return cb(err)
        }
        return cb(null, task)
      })
    },
    getAll: (params, cb) => {
      User.findOne(params, (err, data) => {
        if (err) {
          return cb(err)
        }
        return cb(null, data.tasks)
      })
    }
  }
}
