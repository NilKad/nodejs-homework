// const contactsOperations = require("../../models/contacts.js");
const contactsOperations = require("../../models/contacts.js");

const getAll = async (req, res, next) => {
  let data = null;

  data = await contactsOperations.listContacts();
  console.log("!!!!!!!!!!!!!!!!! GET");
  res.json({ message: "read all contacts", data });
};

module.exports = getAll;
