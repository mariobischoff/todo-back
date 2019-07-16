import express from 'express'
import consign from 'consign'
import logger from 'morgan'
import db from './database'
import define from './define'
import cors from 'cors'

db

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(logger("dev"))
app.use('/uploads', express.static('uploads'))

consign()
  .include('routers')
  .then('controllers')
  .then('models')
  .into(app)

app.listen(PORT, () => {
  console.log(`Server running at ${define.APP_PORT}.`)
})
