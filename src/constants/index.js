import path from 'path';

export const ONE_DAY = 24 * 60 * 60 * 1000;
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
export const CLOUDINARY = {
  CLOUDINARY_NAME: 'CLOUDINARY_NAME',
  CLOUDINARY_API_KEY: 'CLOUDINARY_API_KEY',
  CLOUDINARY_API_SECRET: 'CLOUDINARY_API_SECRET',
};
