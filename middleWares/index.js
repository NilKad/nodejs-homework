const { validation } = require("./validation");
const ctrlWrapper = require("./ctrlWrapper");
const isValidId = require("./isValidId");
const isQueryEmail = require("./isQueryEmail");
const auth = require("./authMiddleware");
const uploadFile = require("./uploadFile");

// uploadFile
module.exports = {
  validation,
  ctrlWrapper,
  isValidId,
  isQueryEmail,
  auth,
  uploadFile,
};
