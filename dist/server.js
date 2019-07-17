'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _consign = require('consign');

var _consign2 = _interopRequireDefault(_consign);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _database = require('./src/database');

var _database2 = _interopRequireDefault(_database);

var _define = require('./src/define');

var _define2 = _interopRequireDefault(_define);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_database2.default;

var PORT = process.env.PORT || 3000;
var app = (0, _express2.default)();

app.use((0, _cors2.default)());
app.use(_express2.default.json());
app.use((0, _morgan2.default)("dev"));
app.use('/uploads', _express2.default.static('uploads'));

(0, _consign2.default)().include('src/routers').then('src/controllers').then('src/models').into(app);

app.listen(PORT, function () {
  console.log('Server running at ' + _define2.default.APP_PORT + '.');
});