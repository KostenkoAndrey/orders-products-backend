import createHttpError from 'http-errors';
import { getAllOrders, getOrderById, createOrder, deleteOrder, updateOrder } from '../services/orders.js';

export const getOrdersController = async (req, res) => {
  const orders = await getAllOrders(req.user.id);

  res.json({
    status: 200,
    message: 'Successfully found orders!',
    data: orders,
  });
};

export const getOrdersByIdController = async (req, res, next) => {
  const { orderId } = req.params;
  const order = await getOrderById(orderId, req.user.id);

  if (!order) {
    throw createHttpError(404, 'Order not found');
  }

  res.json({
    status: 200,
    message: `Successfully found order with id ${orderId}!`,
    data: order,
  });
};

export const createOrderController = async (req, res) => {
  const order = await createOrder(req.body, req.user.id);

  res.status(201).json({
    status: 201,
    message: `Successfully created a order!`,
    data: order,
  });
};

export const deleteOrderController = async (req, res) => {
  const { orderId } = req.params;

  const order = await deleteOrder(orderId, req.user._id);

  if (!order) {
    throw createHttpError(404, 'Order not found');
  }

  res.status(204).send();
};

export const upsertOrderController = async (req, res) => {
  const { orderId } = req.params;

  const result = await updateOrder(orderId, req.user._id, req.body, {
    upsert: true,
  });

  if (!result) {
    throw createHttpError(404, 'Order not found');
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a order!`,
    data: result.product,
  });
};

export const patchOrderController = async (req, res) => {
  const { orderId } = req.params;
  const result = await updateOrder(orderId, req.user._id, req.body);

  if (!result) {
    throw createHttpError(404, 'Order not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a order!`,
    data: result.product,
  });
};
