'use strict';

var _celebrate = require('celebrate');

var _joiObjectid = require('joi-objectid');

var _joiObjectid2 = _interopRequireDefault(_joiObjectid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_celebrate.Joi.objectId = (0, _joiObjectid2.default)(_celebrate.Joi);

module.exports = {
  taskCreateValidator: (0, _celebrate.celebrate)({
    body: _celebrate.Joi.object().keys({
      title: _celebrate.Joi.string().required(),
      description: _celebrate.Joi.string().required(),
      doneAt: _celebrate.Joi.string().required()
    }).unknown()
  }),
  taskAlterValidator: (0, _celebrate.celebrate)({
    body: _celebrate.Joi.object().keys({
      _id: _celebrate.Joi.objectId().optional(),
      title: _celebrate.Joi.string().optional(),
      description: _celebrate.Joi.string().optional(),
      status: _celebrate.Joi.string().optional(),
      doneAt: _celebrate.Joi.string().optional(),
      createdAt: _celebrate.Joi.string().optional()
    })
  })
};