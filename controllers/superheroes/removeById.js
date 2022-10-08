const { Superhero } = require("../../models/superhero");

const getById = async (req, res) => {
  const { id } = req.params;
  const removedHero = await Superhero.findByIdAndRemove(id);
  if (!removedHero) {
    throw RequestError(404, "Not found");
  }
  res.json(removedHero);
};

module.exports = getById;
