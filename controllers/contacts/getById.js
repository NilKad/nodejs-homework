const { Contact } = require("../../models");
const nullQuery = require("./nullQuery.js");

const getById = async (req, res, next) => {
  let data = null;
  const { contactId } = req.params;

  data = await Contact.findById(contactId);
  nullQuery(data);
  res.json({ message: "read contacts by ID", data });
};

module.exports = getById;
