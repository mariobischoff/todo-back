import { verifyToken } from '../middleware/auth'
import { userCreateValidator, userLoginValidator, idOptionalValidator, userAlterValidator, tokenValidator, idValidator } from '../validations/user'

module.exports = app => {
  /**
   * ROUTE: /user/register
   * VERB: POST
   * PUBLIC: true
   */
  app.post('/user/register', (req, res) => {
    app.controllers.user.save(req, res)
  })
  /**
   * ROUTE: /user/login
   * VERB: POST
   * PUBLIC: true
   */
  app.post('/user/login', (req, res) => {
    app.controllers.user.login(req, res)
  })
  /**
   * ROUTE: /user/id?
   * VERB: GET
   * PUBLIC: false
   */
  app.get('/user/:id?', tokenValidator, idOptionalValidator, verifyToken, (req, res) => {
    app.controllers.user.list(req, res)
  })
  /**
   * ROUTE: /user/id
   * VERB: PUT
   * PUBLIC: false
   */
  app.put('/user/:id', tokenValidator, userAlterValidator, idValidator, verifyToken, (req, res) => {
    app.controllers.user.update(req, res)
  })
  /**
   * ROUTE: /user/id
   * VERB: DELETE
   * PUBLIC: false
   */
  app.delete('/user/:id', tokenValidator, idValidator, verifyToken, (req, res) => {
    app.controllers.user.delete(req, res)
  })
}