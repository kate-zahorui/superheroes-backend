const express = require("express");
const Joi = require("joi");
const heroes = require("../../models/heroes");
const { RequestError } = require("../../helpers");

const router = express.Router();

const addSchema = Joi.object({
  nickname: Joi.string().required(),
  realName: Joi.string().required(),
  originDescription: Joi.string().required(),
  superpowers: Joi.string().required(),
  catchPhrase: Joi.string().required(),
  Images: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const allHeroes = await heroes.listHeroes();
    res.json(allHeroes);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const hero = await heroes.getHeroById(id);
    if (!hero) {
      throw RequestError(404, "Not found");
    }
    res.json(hero);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }

    const newHero = await heroes.addHero(req.body);
    res.status(201).json(newHero);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedHero = await heroes.removeHero(id);
    if (!removedHero) {
      throw RequestError(404, "Not found");
    }

    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { id } = req.params;

    const newHero = await heroes.updateHero(id, req.body);
    if (!newHero) {
      throw RequestError(404, "Not found");
    }

    res.json(newHero);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
