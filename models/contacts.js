const Joi = require("joi");
const { Schema, model } = require("mongoose");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const joiContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const idContactSchema = Joi.object({
  // contactId: Joi.string().required("Error id requared"),
  // favorite: Joi.boolean(),
});

const Contact = model("contacts", contactSchema);

module.exports = { Product: Contact, joiContactSchema, idContactSchema };
