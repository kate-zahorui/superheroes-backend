const fs = require("fs/promises");
const { RequestError, uploadCloud } = require("../../helpers");
const { Superhero } = require("../../models/superhero");

const updateById = async (req, res, next) => {
  const { id } = req.params;

  const imagesUrls = [];
  req.files.forEach(async (item) => {
    const uploadedImage = await uploadCloud(item.path);
    imagesUrls.push(uploadedImage.public_id);
  });

  const reqBody = {
    ...req.body,
    images: imagesUrls,
  };

  try {
    const newHero = await Superhero.findByIdAndUpdate(id, reqBody, {
      new: true,
    });
    if (!newHero) {
      throw RequestError(404, "Not found");
    }
    res.json(newHero);
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

module.exports = updateById;
