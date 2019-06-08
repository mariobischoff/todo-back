import mongoose from 'mongoose'
import define from '../define'

mongoose.connect(define.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection

db.on('open', () => {
  console.log('on')
})

module.exports = mongoose