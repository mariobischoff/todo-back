import { verifyToken } from '../middleware/auth'
import { idOptionalValidator, idValidator, tokenValidator } from '../validations/user'
import { taskCreateValidator, taskAlterValidator } from '../validations/task'

module.exports = app => {
  /**
   * ROUTE: /task
   * VERB: POST
   * PUBLIC: false
   */
  app.post('/task', taskCreateValidator, verifyToken, (req, res) => {
    app.src.controllers.task.save(req, res)
  })
  /**
   * ROUTE: /task/:id?
   * VERB: GET
   * PUBLIC: false
   */
  app.get('/task/:id?', verifyToken, (req, res) => {
    app.src.controllers.task.list(req, res)
  })
  /**
   * ROUTE: /task/:id
   * VERB: PUT
   * PUBLIC: false
   */
  app.put('/task/:id', tokenValidator, idValidator, taskAlterValidator, verifyToken, (req, res) => {
    app.src.controllers.task.update(req, res)
  })
  /**
   * ROUTE: /task/:id
   * VERB: DELETE
   * PUBLIC: false
   */
  app.delete('/task/:id', tokenValidator, idValidator, verifyToken, (req, res) => {
    app.src.controllers.task.delete(req, res)
  })
}
