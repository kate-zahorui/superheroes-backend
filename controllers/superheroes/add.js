const { Superhero } = require("../../models/superhero");

const add = async (req, res) => {
  const newHero = await Superhero.create(req.body);
  res.status(201).json(newHero);
};

module.exports = add;
