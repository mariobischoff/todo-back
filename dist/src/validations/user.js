'use strict';

var _celebrate = require('celebrate');

var _joiObjectid = require('joi-objectid');

var _joiObjectid2 = _interopRequireDefault(_joiObjectid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_celebrate.Joi.objectId = (0, _joiObjectid2.default)(_celebrate.Joi);

module.exports = {
  userCreateValidator: (0, _celebrate.celebrate)({
    body: _celebrate.Joi.object().keys({
      name: _celebrate.Joi.string().required(),
      email: _celebrate.Joi.string().email().trim().required(),
      password: _celebrate.Joi.string().min(4).max(12).required(),
      repassword: _celebrate.Joi.string().min(4).max(12).required()
    })
  }),
  userAlterValidator: (0, _celebrate.celebrate)({
    body: _celebrate.Joi.object().keys({
      name: _celebrate.Joi.string().optional(),
      email: _celebrate.Joi.string().email().trim().optional(),
      password: _celebrate.Joi.string().alphanum().min(4).max(12).optional(),
      repassword: _celebrate.Joi.string().alphanum().min(4).max(12).optional()
    })
  }),
  userLoginValidator: (0, _celebrate.celebrate)({
    body: _celebrate.Joi.object().keys({
      email: _celebrate.Joi.string().email().required(),
      password: _celebrate.Joi.string().alphanum().min(4).max(12).required()
    })
  }),
  tokenValidator: (0, _celebrate.celebrate)({
    headers: _celebrate.Joi.object({
      authorization: _celebrate.Joi.string().required()
    }).unknown(true)
  }),
  idOptionalValidator: (0, _celebrate.celebrate)({
    params: _celebrate.Joi.object({
      id: _celebrate.Joi.objectId().optional()
    })
  }),
  idValidator: (0, _celebrate.celebrate)({
    params: _celebrate.Joi.object({
      id: _celebrate.Joi.objectId()
    })
  })
};