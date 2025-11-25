import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidProductId = (req, res, next) => {
  const { productId } = req.params;
  if (!isValidObjectId(productId)) {
    throw createHttpError(400, 'Invalid product ID format');
  }

  next();
};

export const isValidOrderId = (req, res, next) => {
  const { orderId } = req.params;
  if (!isValidObjectId(orderId)) {
    throw createHttpError(400, 'Invalid order ID format');
  }

  next();
};
