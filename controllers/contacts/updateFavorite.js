const { Contact } = require("../../models");
const nullQuery = require("./nullQuery.js");

const updateFavorite = async (req, res, next) => {
  let data = null;
  const { contactId } = req.params;
  const { favorite } = req.body;
  data = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  nullQuery(data);
  res.status(200);
  res.json({ message: "update success", data });
};

module.exports = updateFavorite;
