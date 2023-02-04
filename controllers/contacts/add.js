const { Contact } = require("../../models");

const nullQuery = require("./nullQuery.js");

const add = async (req, res, next) => {
  let data = null;
  const { _id } = req.user;
  const body = req.body;

  data = await Contact.create({ ...body, owner: _id });
  nullQuery(data);
  res.status(201);
  res.json({ message: "contacts added", data });
};

module.exports = add;
