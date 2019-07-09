import jwt from 'jsonwebtoken'
import define from '../define'

module.exports = {
  verifyToken: (req, res, next) => {
    console.log(req.headers.authorization)
    if (!req.headers.authorization) {
      res.status(400).send('Missing token')
      return
    }
    const token = req.headers.authorization
    jwt.verify(token, define.SHA, (err, decoded) => {
      if (err) {
        console.log('token invalido')
        res.status(401).send('Token invalid')
        return
      }
      res.locals.id = decoded.sub
      next()
    })
  }
}
