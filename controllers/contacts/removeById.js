const contactsOperations = require("../../models/contacts.js");
const nullQuery = require("./nullQuery.js");

const removeById = async (req, res, next) => {
  let data = null;
  const { contactId } = req.params;
  // console.log("!!!!removeByID req.params: ", req.params);

  data = await contactsOperations.removeContact(contactId);
  nullQuery(data);
  // console.log("!!!!removeByID data: ", data);
  res.status(200);
  res.json({ message: "contact deleted", data });
};

module.exports = removeById;
