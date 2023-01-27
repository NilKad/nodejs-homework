const { Product } = require("../../models");

const getAll = async (req, res, next) => {
  let data = null;

  data = await Product.find({});
  console.log("!!!!!!!!!!!!!!!!! GET");
  res.json({ message: "read all contacts", data });
};

module.exports = getAll;
