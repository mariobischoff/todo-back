module.exports = app => {
  /**
   * ROUTE: /user/register
   * VERB: POST
   * PUBLIC: true
   */
  app.post('/user/register', (req, res) => {

  })
  /**
   * ROUTE: /user/id?
   * VERB: GET
   * PUBLIC: false
   */
  app.get('/user/:id?', (req, res) => {

  })
  /**
   * ROUTE: /user/id
   * VERB: PUT
   * PUBLIC: false
   */
  app.put('user/:id', (req, res) => {

  })
  /**
   * ROUTE: /user/id
   * VERB: DELETE
   * PUBLIC: false
   */
  app.delete('user/:id', (req, res) => {

  })
}