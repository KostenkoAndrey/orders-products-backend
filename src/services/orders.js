import { Types } from 'mongoose';
import { OrdersCollection } from '../db/models/order.js';
import { ProductsCollection } from '../db/models/product.js';

export const getAllOrders = async (userId) => {
  return OrdersCollection.aggregate([
    {
      $match: {
        userId: new Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'orderId',
        as: 'products',
      },
    },
  ]);
};

export const getOrderById = async (orderId, userId) => {
  return OrdersCollection.findOne({
    _id: orderId,
    userId: userId,
  }).populate('products');
};

export const createOrder = async (payload, userId) => {
  return OrdersCollection.create({ ...payload, userId });
};

export const deleteOrder = async (orderId, userId) => {
  const order = await OrdersCollection.findOneAndDelete({
    _id: orderId,
    userId: userId,
  });

  if (order) {
    await ProductsCollection.deleteMany({
      orderId: orderId,
    });
  }

  return order;
};

export const updateOrder = async (orderId, userId, payload, options = {}) => {
  const rawResult = await OrdersCollection.findOneAndUpdate({ _id: orderId, userId: userId }, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    order: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
