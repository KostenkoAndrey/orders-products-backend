import Joi from 'joi';

export const createOrderSchema = Joi.object({
  title: Joi.string().min(1).max(30).required(),
  date: Joi.date().required(),
  description: Joi.string().min(3).max(500).required(),
});

export const updateOrderSchema = Joi.object({
  title: Joi.string().min(1).max(30),
  date: Joi.date(),
  description: Joi.string().min(3).max(500),
});
