const contactsOperations = require("../../models/contacts.js");
const nullQuery = require("./nullQuery.js");

const getById = async (req, res, next) => {
  let data = null;
  const { contactId } = req.params;

  try {
    data = await contactsOperations.getContactById(contactId);
    nullQuery(data);
  } catch (error) {
    console.log("!!!!Router CATCH GET/:contactId");
    next(error);
    return;
  }
  res.json({ message: "read contacts by ID", data });
};

module.exports = getById;
