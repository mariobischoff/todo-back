import { verifyToken } from '../middleware/auth'

module.exports = app => {
  /**
   * ROUTE: /task
   * PUBLIC: false
   */
  app.post('/task', verifyToken, (req, res) => {
    app.controllers.task.save(req, res)
  })
  app.get('/task/:id?', (req, res) => {

  })
  app.put('/task/:id', (req, res) => {

  })
  app.delete('/task/:id', (req, res) => {

  })
}