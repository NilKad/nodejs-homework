const { isValidObjectId } = require("mongoose");
const { requestError } = require("../utils");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    console.log("not Correct ID");
    const err = requestError(400, `${contactId} is not correct`);
    err.data = { status: 400, data: null };
    next(err);
  }
  next();
};

module.exports = isValidId;
