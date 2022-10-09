const express = require("express");

const ctrl = require("../../controllers/superheroes");
const { multerUpload, validateBody } = require("../../middlewares");
const { addSchema } = require("../../models/superhero");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post(
  "/",
  multerUpload.array("images"),
  validateBody(addSchema),
  ctrlWrapper(ctrl.add)
);

router.put(
  "/:id",
  multerUpload.array("images"),
  validateBody(addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
