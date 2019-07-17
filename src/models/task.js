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
        User.findOneAndUpdate(params, { tasks: data.tasks }, { new: true }, (err, result) => {
          if (err) {
            return cb(err)
          }
          return cb(false, result)
        })
      })
    },
    // Atualiza tarefa
    update: (params, idTask, body, cb) => {
      User.findById(params, (err, data) => {
        if (err) {
          cb(err)
          return
        }
        data.tasks.filter((task) => {
          if (task._id == idTask) {
            if (body.status) {
              task.status = body.status
            }
            task.title = body.title
            task.description = body.description
          }
        })
        User.findOneAndUpdate(params, { tasks: data.tasks }, { new: true }, (err, data) => {
          if (err) {
            cb(err)
            return
          }
          cb(null, data)
        })
      })
    },
    // Remove tarefa
    delete: (params, idTask, cb) => {
      User.findById(params, (err, data) => {
        if (err) {
          cb(err)
          return
        }
        data.tasks.filter((task, index, arr) => {
          if (task._id == idTask) {
            arr.splice(index, 1)
          }
        })
        User.findByIdAndUpdate(params, { tasks: data.tasks }, { new: true }, (err, data) => {
          if (err) {
            cb(err)
            return
          }
          cb(null, data)
        })
      })
    },
    // Recupera uma tarefa
    getOne: (params, idTask, cb) => {
      let task = null
      User.findOne(params, (err, user) => {
        if (err) {
          return cb(err)
        }
        task = user.tasks.filter(task => {
          return task._id == idTask
        })
        user.tasks = task
        cb(null, user)
      })
    },
    // Recupera todas as tarefas
    getAll: (params, cb) => {
      User.findOne(params, (err, user) => {
        if (err) {
          return cb(err)
        }
        cb(null, user)
      })
    }
  }
}
