import { celebrate, Joi } from 'celebrate'
import objectId from 'joi-objectid'

Joi.objectId = objectId(Joi)

module.exports = {
  userCreateValidator: celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().trim().required(),
      password: Joi.string().min(4).max(12).required(),
      repassword: Joi.string().min(4).max(12).required()
    })
  }),
  userAlterValidator: celebrate({
    body: Joi.object().keys({
      name: Joi.string().optional(),
      email: Joi.string().email().trim().optional(),
      password: Joi.string().alphanum().min(4).max(12).optional(),
      repassword: Joi.string().alphanum().min(4).max(12).optional()
    })
  }),
  userLoginValidator: celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().alphanum().min(4).max(12).required()    
    })
  }),
  tokenValidator: celebrate({
    headers: Joi.object({
      authorization: Joi.string().required()
    }).unknown(true)
  }),
  idOptionalValidator: celebrate({
    params: Joi.object({
      id: Joi.objectId().optional()
    })
  }),
  idValidator: celebrate({
    params: Joi.object({
      id: Joi.objectId()
    })
  })
}
