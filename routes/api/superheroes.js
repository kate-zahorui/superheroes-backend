const express = require("express");

const ctrl = require("../../controllers/superheroes");
const validateBody = require("../../middlewares/validateBody");
const { addSchema } = require("../../models/superhero");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validateBody(addSchema), ctrlWrapper(ctrl.add));

router.put("/:id", validateBody(addSchema), ctrlWrapper(ctrl.updateById));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
