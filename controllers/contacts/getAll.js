const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  let data = null;

  const { _id } = req.user;
  data = await Contact.find({ owner: _id }).populate(
    "owner",
    "_id email subscription"
  );
  console.log("!!!!!!!!!!!!!!!!! GET");
  res.json({ message: "read all contacts", data });

  console.log();
};

module.exports = getAll;
