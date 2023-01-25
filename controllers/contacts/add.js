const contactsOperations = require("../../models/contacts.js");
const contactValidate = require("./contactValidate.js");
const nullQuery = require("./nullQuery.js");

const add = async (req, res, next) => {
  let data = null;
  const body = req.body;
  console.log("post req.params", body);

  try {
    contactValidate(body);
    data = await contactsOperations.addContact(body);
    nullQuery(data);
    res.status(201);
  } catch (error) {
    console.log("!!!!!!POST CATCH");
    console.log("!!!!!!POST ERROR.MESSAGE: ", error.message);
    next(error);
    return;
  }
  console.log("!!!!!!POST END");
  res.json({ message: "contacts added", data });
};

module.exports = add;
