// const path = require("path");
const fs = require("fs/promises");
const { RequestError, uploadCloud } = require("../../helpers");
const { Superhero } = require("../../models/superhero");

// const superheroesDir = path.join(__dirname, "../../public", "superheroes");

const updateById = async (req, res, next) => {
  const { id } = req.params;
  // const imagesURLs = req.files.map((item) => {
  //   const imageURL = path.join("public", "superheroes", item.originalname);
  //   return imageURL;
  // });
  const imagesURLs = req.files.map((item) => item.originalname);

  const reqBody = {
    ...req.body,
    images: imagesURLs,
  };
  console.log(reqBody);

  try {
    req.files.map(async (item) => {
      uploadCloud(item.path);
    });
    // req.files.map(async (item) => {
    //   const resultUpload = path.join(superheroesDir, item.originalname);
    //   await fs.rename(item.path, resultUpload);
    // });

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
