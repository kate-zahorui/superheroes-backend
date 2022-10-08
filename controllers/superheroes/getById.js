const { Superhero } = require("../../models/superhero");

const getById = async (req, res) => {
  const { id } = req.params;
  const hero = await Superhero.findById(id);
  res.json(hero);
};

module.exports = getById;
