const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");

const superheroSchema = new Schema(
  {
    nickname: {
      type: String,
      required: true,
      unique: true,
    },
    realName: {
      type: String,
      required: true,
    },
    originDescription: {
      type: String,
      required: true,
    },
    superpowers: {
      type: String,
      required: true,
    },
    catchPhrase: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
  },
  { versionKey: false, timestamps: true }
);

superheroSchema.post("save", handleSaveErrors);

const addSchema = Joi.object({
  nickname: Joi.string().required(),
  realName: Joi.string().required(),
  originDescription: Joi.string().required(),
  superpowers: Joi.string().required(),
  catchPhrase: Joi.string().required(),
  // images: Joi.string(),
});

const Superhero = model("superhero", superheroSchema);

module.exports = { Superhero, addSchema };
