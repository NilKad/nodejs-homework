// const contactsOperations = require("../../models/contacts.js");
const contactsOperations = require("../../models/contacts.js");

const getAll = async (req, res, next) => {
  let data = null;

  try {
    data = await contactsOperations.listContacts();
  } catch (error) {
    console.log("error routes", error);
    next(error);
    return;
  }
  console.log("!!!!!!!!!!!!!!!!! GET");
  res.json({ message: "read all contacts", data });
};

module.exports = getAll;
