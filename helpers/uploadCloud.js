const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadCloud = async (path) => {
  return await new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { folder: "superheroes" },
      (error, result) => {
        if (error) reject(error);
        // if (result)
        resolve;
      }
    );
  });
};

module.exports = uploadCloud;
