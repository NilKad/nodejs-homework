const contactSchema = require("../../schems/contactsSchema");

const contactValidate = (body) => {
  const { error } = contactSchema.validate(body);
  if (error) {
    error.status = 400;
    throw error;
  }
  return true;
};

module.exports = contactValidate;
