import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tasks: [
    {
      title: {
        type: String
      },
      status: {
        type: String,
        enum: ['trash', 'done', 'open'],
        default: 'open'
      },
      doneAt: {
        type: Date
      },
      createdAt: {
        type: Date
      }
    }
  ]
})

export default mongoose.model('User', userSchema)
