const fs = require("fs/promises");
const { uploadCloud } = require("../../helpers");
const { Superhero } = require("../../models/superhero");

const add = async (req, res, next) => {
  try {
    const files = req.files;
    const imagesURLs = [];

    for (const file of files) {
      const uploadedImage = await uploadCloud(file.path);
      imagesURLs.push(uploadedImage.public_id);
    }

    const reqBody = {
      ...req.body,
      images: imagesURLs,
    };

    const newHero = await Superhero.create(reqBody);
    res.status(201).json(newHero);
  } catch (error) {
    try {
      req.files.map(async (item) => {
        await fs.unlink(item.path);
      });
      throw error;
    } catch (error) {
      next(error);
    }
  }
};

module.exports = add;
