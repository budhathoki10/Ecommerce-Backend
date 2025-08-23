const cloudinary = require('../services/Cloudinary.services');
const streamifier = require('streamifier');

const uploadImageToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'Ecommerce Backend' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

module.exports = uploadImageToCloudinary;
