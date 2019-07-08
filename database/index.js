import mongoose from 'mongoose'
import define from '../define'

mongoose.connect(
  define.MONGO_URL,
  { 
    useNewUrlParser: true,
    useCreateIndex: true, 
    useFindAndModify: false
  }
)

const db = mongoose.connection

db.on('open', () => {
  console.log('Db connected')
})

module.exports = mongoose