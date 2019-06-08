import express from 'express'
import consign from 'consign'
import logger from 'morgan'
import db from './database'
import define from './define'

db

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(logger("dev"))

consign()
  .include('routers')
  .then('controllers')
  .then('models')
  .into(app)

app.listen(PORT, () => {
  console.log(`Server running at ${define.APP_PORT}.`)
})