import Joi from 'joi';

export const createProductSchema = Joi.object({
  serialNumber: Joi.number().required(),
  isNew: Joi.boolean().required(),
  title: Joi.string().min(1).max(30).required(),
  type: Joi.string().min(1).max(30).required(),
  specification: Joi.string().min(1).max(30).required(),
  guarantee: Joi.object({
    start: Joi.date().iso().required(),
    end: Joi.date().iso().required(),
  }).required(),
  price: Joi.array()
    .items(
      Joi.object({
        value: Joi.number().min(0).required(),
        symbol: Joi.string().valid('USD', 'UAH').required(),
        isDefault: Joi.boolean().required(),
      }),
    )
    .min(1)
    .required(),
  date: Joi.date().iso().required(),
  orderId: Joi.string().required(),
});

export const updateProductSchema = Joi.object({
  serialNumber: Joi.number(),
  isNew: Joi.boolean(),
  title: Joi.string().min(1).max(30),
  type: Joi.string().min(1).max(30),
  specification: Joi.string().min(1).max(30),
  guarantee: Joi.object({
    start: Joi.date().iso().required(),
    end: Joi.date().iso().required(),
  }),
  price: Joi.array()
    .items(
      Joi.object({
        value: Joi.number().min(0),
        symbol: Joi.string().valid('USD', 'UAH'),
        isDefault: Joi.boolean(),
      }),
    )
    .min(1)
    .required(),
  date: Joi.date().iso(),
  orderId: Joi.string(),
});
