const contactsOperations = require("../../models/contacts.js");
const contactValidate = require("./contactValidate");
const nullQuery = require("./nullQuery.js");

const updateById = async (req, res, next) => {
  let data = null;
  const { contactId } = req.params;
  const body = req.body;
  try {
    contactValidate(body);
    data = await contactsOperations.updateContact(contactId, body);
    nullQuery(data);
    res.status(200);
  } catch (error) {
    next(error);
    return;
  }
  res.json({ message: "update success", data });
};

module.exports = updateById;
