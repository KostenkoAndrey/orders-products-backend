import { UsersCollection } from '../db/models/user.js';

export const getUser = async (userId) => {
  return UsersCollection.findById(userId);
};

export const updateUser = async (userId, payload, options = {}) => {
  const rawResult = await UsersCollection.findOneAndUpdate({ _id: userId }, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    user: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
