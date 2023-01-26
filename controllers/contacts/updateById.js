const contactsOperations = require("../../models/contacts.js");
const nullQuery = require("./nullQuery.js");

const updateById = async (req, res, next) => {
  let data = null;
  const { contactId } = req.params;
  const body = req.body;
  data = await contactsOperations.updateContact(contactId, body);
  nullQuery(data);
  res.status(200);
  res.json({ message: "update success", data });
};

module.exports = updateById;
