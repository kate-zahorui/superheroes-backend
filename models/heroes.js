const fs = require("fs/promises");

const path = require("path");
const { nanoid } = require("nanoid");

const heroesPath = path.join(__dirname, "../models/heroes.json");

async function updateHeroesList(heroes) {
  await fs.writeFile(heroesPath, JSON.stringify(heroes, null, 2));
}

const listHeroes = async () => {
  const data = await fs.readFile(heroesPath);
  return await JSON.parse(data);
};

const getHeroById = async (heroId) => {
  const heroes = await listHeroes();
  const result = heroes.find((item) => item.id === heroId);
  return result || null;
};

const removeHero = async (heroId) => {
  const heroes = await listHeroes();
  const index = heroes.findIndex((item) => item.id === heroId);
  if (index === -1) return null;
  const [result] = heroes.splice(index, 1);
  await updateHeroesList(heroes);
  return result;
};

const addHero = async (body) => {
  const heroes = await listHeroes();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  heroes.push(newContact);
  updateHeroesList(heroes);
  return newContact;
};

const updateHero = async (heroId, body) => {
  const heroes = await listHeroes();
  const index = heroes.findIndex((item) => item.id === heroId);
  if (index === -1) return null;

  heroes[index] = { id: heroId, ...body };
  updateHeroesList(heroes);
  return heroes[index];
};

module.exports = {
  listHeroes,
  getHeroById,
  removeHero,
  addHero,
  updateHero,
};
