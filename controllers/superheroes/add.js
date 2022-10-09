const fs = require("fs/promises");
const { uploadCloud } = require("../../helpers");
const { Superhero } = require("../../models/superhero");

const add = async (req, res, next) => {
  const imagesURLs = req.files.map((item) => item.originalname);

  const reqBody = {
    ...req.body,
    images: imagesURLs,
  };

  try {
    req.files.map(async (item) => {
      uploadCloud(item.path);
    });

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
