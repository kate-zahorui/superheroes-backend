const { Superhero } = require("../../models/superhero");

const getAll = async (req, res) => {
  const allHeroes = await Superhero.find();
  res.json(allHeroes);
};

module.exports = getAll;
