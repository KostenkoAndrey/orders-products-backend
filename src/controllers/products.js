import createHttpError from 'http-errors';

import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getOrderById } from '../services/orders.js';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../services/products.js';

export const getProductsController = async (req, res) => {
  const products = await getAllProducts();

  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const getProductsByIdController = async (req, res) => {
  const { productId } = req.params;
  const { orderId } = req.body;
  const product = await getProductById(productId, orderId);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
};

export const createProductController = async (req, res) => {
  const { orderId } = req.body;
  const order = await getOrderById(orderId, req.user._id);

  if (!order) {
    throw createHttpError(404, 'Order not found');
  }

  const product = await createProduct(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a product!`,
    data: product,
  });
};

export const deleteProductController = async (req, res) => {
  const { productId } = req.params;

  const product = await deleteProduct(productId);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(204).send();
};

export const upsertProductController = async (req, res) => {
  const { productId } = req.params;
  const { orderId } = req.body;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateProduct(productId, orderId, req.body, {
    upsert: true,
    photo: photoUrl,
  });

  if (!result) {
    throw createHttpError(404, 'Product not found');
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a product!`,
    data: result.product,
  });
};

export const patchProductController = async (req, res) => {
  const { productId } = req.params;
  const { orderId } = req.body;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateProduct(productId, orderId, {
    ...req.body,
    photo: photoUrl,
  });

  if (!result) {
    throw createHttpError(404, 'Product not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a product!`,
    data: result.product,
  });
};
