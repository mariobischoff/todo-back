import { celebrate, Joi } from 'celebrate'
import objectId from 'joi-objectid'

Joi.objectId = objectId(Joi)

module.exports = {
  taskCreateValidator: celebrate({
    body: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      doneAt: Joi.string().required()
    }).unknown()
  }),
  taskAlterValidator: celebrate({
    body: Joi.object().keys({
      title: Joi.string().optional(),
      description: Joi.string().optional()
    })
  })
}
