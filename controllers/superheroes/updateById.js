const { RequestError } = require("../../helpers");
const { Superhero } = require("../../models/superhero");

const updateById = async (req, res) => {
  const { id } = req.params;
  const newHero = await Superhero.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!newHero) {
    throw RequestError(404, "Not found");
  }
  res.json(hero);
};

module.exports = updateById;
