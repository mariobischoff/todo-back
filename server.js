import express from 'express'
import consign from 'consign'
import logger from 'morgan'
<<<<<<< HEAD
import db from './database'
import define from './define'

db
=======
import mongoose from 'mongoose'
import dotenv from 'dotenv'


dotenv.config()
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});
>>>>>>> 1940528ff63150d8079fd009e3a4fbb976c1f251

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