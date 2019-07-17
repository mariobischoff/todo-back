'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = new _mongoose2.default.Schema({
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
  avatar: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tasks: [{
    title: {
      type: String
    },
    description: {
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
  }]
});

exports.default = _mongoose2.default.model('User', userSchema);