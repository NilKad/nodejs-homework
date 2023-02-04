const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  let data = null;

  const { _id } = req.user;
  const queryObject = { owner: _id };
  const totalContactsOwner = await Contact.find(queryObject).count();

  let { limit: perPage = 5, page = 1, favorite = null } = req.query;
  page = Number(page);
  perPage = Number(perPage);

  if (favorite !== null) queryObject.favorite = favorite;

  data = await Contact.find(queryObject)
    .populate("owner", "_id email subscription")
    .limit(perPage)
    .skip((page - 1) * perPage);
  res.json({
    message: "read all contacts",
    totalContacts: totalContactsOwner,
    page,
    totalPages: Math.ceil(totalContactsOwner / perPage),
    perPage: perPage,
    currentOnPage: data.length,
    data,
  });

  console.log();
};

module.exports = getAll;
