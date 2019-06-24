import jwt from 'jsonwebtoken'
import define from '../define'

module.exports = {
  verifyToken: (req, res, next) => {
    if (!req.headers.authorization) {
      res.status(400).send('Missing token')
      return
    }
    const token = req.headers.authorization
    jwt.verify(token, define.SHA, (err, decoded) => {
      if (err) {
        res.status(401).send('Token invalid')
        return
      }
      res.locals.id = decoded.sub
      next()
    })
  }
}
