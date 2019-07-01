import { verifyToken } from '../middleware/auth'

module.exports = app => {
  /**
   * ROUTE: /task
   * PUBLIC: false
   */
  app.post('/task', verifyToken, (req, res) => {
    app.controllers.task.save(req, res)
  })
  app.get('/task/:id?', verifyToken, (req, res) => {
    app.controllers.task.list(req, res)
  })
  app.put('/task/:id', verifyToken, (req, res) => {
    app.controllers.task.update(req, res)
  })
  app.delete('/task/:id', verifyToken, (req, res) => {
    app.controllers.task.delete(req, res)
  })
}
