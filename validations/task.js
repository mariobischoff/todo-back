import { celebrate, Joi } from 'celebrate'

module.exports = {
  taskCreateValidator: celebrate({
    body: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required()
    })
  }),
  taskFindId: celebrate({
    params: {
      id: Joi.string().regex(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/).optional()
    }
  })
}
