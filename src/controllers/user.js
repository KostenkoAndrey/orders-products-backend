import createHttpError from 'http-errors';

import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { getUser, updateUser } from '../services/user.js';

export const getUserController = async (req, res) => {
  const user = await getUser(req.user._id);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found user info!',
    data: user,
  });
};

export const patchUserController = async (req, res) => {
  const photo = req.file;

  let photoUrl;
  const shouldRemovePhoto = req.body.photo === null;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  } else if (shouldRemovePhoto) {
    delete req.body.photo;
  }

  const result = await updateUser(req.user.id, {
    ...req.body,
    photo: shouldRemovePhoto ? null : photoUrl,
  });

  if (!result) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated a user!',
    data: result.user,
  });
};
