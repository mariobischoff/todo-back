import { celebrate, Joi } from 'celebrate'

module.exports = {
  userCreateValidator: celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().trim().required(),
      password: Joi.string().alphanum().min(4).max(12).required(),
      repassword: Joi.string().alphanum().min(4).max(12).required()
    })
  }),
  userLoginValidator: celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().alphanum().min(4).max(12).required()    
    })
  })
}
