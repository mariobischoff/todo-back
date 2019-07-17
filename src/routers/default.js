module.exports = app => {
  app.all('/', (req, res) => {
    res.send('Hello Mad World')
  })
}