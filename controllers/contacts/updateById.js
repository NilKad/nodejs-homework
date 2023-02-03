const { Contact } = require("../../models");
// const contactsOperations = require("../../models/contacts-json.js");
const nullQuery = require("./nullQuery.js");

const updateById = async (req, res, next) => {
  let data = null;
  const { contactId } = req.params;
  const body = req.body;
  data = await Contact.findByIdAndUpdate(contactId, body, { new: true });
  nullQuery(data);
  res.status(200);
  res.json({ message: "update success", data });
};

module.exports = updateById;
