import { ProductsCollection } from '../db/models/product.js';

export const getAllProducts = async () => {
  return ProductsCollection.find();
};

export const getProductById = async (productId, orderId) => {
  return ProductsCollection.findOne({
    _id: productId,
    orderId: orderId,
  });
};

export const createProduct = async (payload, photoUrl) => {
  return ProductsCollection.create({ ...payload, photo: photoUrl });
};

export const deleteProduct = async (productId) => {
  return ProductsCollection.findOneAndDelete({ _id: productId });
};

export const updateProduct = async (productId, orderId, payload, options = {}) => {
  const { photo, ...mongoOptions } = options;
  const updateData = photo ? { ...payload, photo } : payload;

  const rawResult = await ProductsCollection.findOneAndUpdate({ _id: productId, orderId: orderId }, updateData, {
    new: true,
    includeResultMetadata: true,
    ...mongoOptions,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    product: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
