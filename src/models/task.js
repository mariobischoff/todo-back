import User from '../schemas/user'
import _ from 'lodash'

module.exports = app => {
  return {
    // Adiciona tarefa
    addTask: (params, task, cb) => {
      User.findOne(params, (err, user) => {
        if (err) {
          return cb(err)
        }
        user.tasks.push(task)
        User.findOneAndUpdate(params, { tasks: user.tasks }, { new: true }, (err, doc) => {
          if (err) {
            return cb(err)
          }
          let newTask = doc.tasks.pop()
          return cb(false, newTask)
        })
      })
    },
    // Atualiza tarefa
    update: (params, idTask, body, cb) => {
      let newTask = null
      User.findById(params, (err, user) => {
        if (err) {
          cb(err)
          return
        }
        user.tasks.filter((task) => {
          if (task._id == idTask) {
            body.status ? task.status = body.status : task.status = 'open'
            if (body.title) {
              task.title = body.title
            }
            if (body.description) {
              task.description = body.description
            }
            if (body.doneAt) {
              task.doneAt = body.doneAt
            }
            newTask = task
          }
        })
        User.findOneAndUpdate(params, { tasks: user.tasks }, { new: true }, (err, user) => {
          if (err) {
            cb(err)
            return
          }
          cb(null, newTask)
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
          cb(null, idTask)
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
        cb(null, task)
      })
    },
    // Recupera todas as tarefas
    getAll: (params, cb) => {
      User.findOne(params, (err, user) => {
        if (err) {
          return cb(err)
        }
        cb(null, user.tasks)
      })
    }
  }
}
