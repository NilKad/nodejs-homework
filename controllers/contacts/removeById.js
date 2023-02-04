const { Contact } = require("../../models");
const nullQuery = require("./nullQuery.js");

const removeById = async (req, res, next) => {
  let data = null;
  const { contactId } = req.params;

  data = await Contact.findByIdAndRemove(contactId);
  nullQuery(data);
  res.status(200);
  res.json({ message: "contact deleted", data });
};

module.exports = removeById;
