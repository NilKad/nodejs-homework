const Joi = require("joi");
const { Schema, model, SchemaTypes } = require("mongoose");
const { handleSchemaValidationError } = require("../utils");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact is requiared"],
    },
    email: {
      type: String,
      required: [true, "Set email is required"],
    },
    phone: {
      type: String,
      required: [true, "Set phone is required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post("save", handleSchemaValidationError);

const joiContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

// const idContactSchema = Joi.object({
//   contactId: Joi.string().length(24),
// });

const Contact = model("contacts", contactSchema);

module.exports = { Contact, joiContactSchema };
