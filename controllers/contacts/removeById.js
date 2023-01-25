const contactsOperations = require("../../models/contacts.js");
const nullQuery = require("./nullQuery.js");

const removeById = async (req, res, next) => {
  let data = null;
  const { contactId } = req.params;

  try {
    data = await contactsOperations.removeContact(contactId);
    nullQuery(data);
    res.status(200);
    res.message("contact deleted");
  } catch (error) {
    next(error);
    return;
  }
  res.json({ message: "contact deleted", data });
};

module.exports = removeById;
