import express from 'express'
import consign from 'consign'
import logger from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'


dotenv.config()
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

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
  console.log(`Server running at ${PORT}.`)
})