// const contactsOperations = require("../../models/contacts-json.js");
// const { validation } = require("../../middleWares");
const { Product } = require("../../models");

const nullQuery = require("./nullQuery.js");

const add = async (req, res, next) => {
  let data = null;
  const body = req.body;
  console.log("post req.params", body);

  data = await Product.create(body);
  nullQuery(data);
  res.status(201);
  console.log("!!!!!!POST END");
  res.json({ message: "contacts added", data });
};

module.exports = add;
