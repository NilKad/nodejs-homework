// const contactsOperations = require("../../models/contacts-json.js");
const { Product } = require("../../models");

const nullQuery = require("./nullQuery.js");

const getById = async (req, res, next) => {
  let data = null;
  const { contactId } = req.params;

  data = await Product.findById(contactId);
  // console.log(data);
  nullQuery(data);
  res.json({ message: "read contacts by ID", data });
};

module.exports = getById;
