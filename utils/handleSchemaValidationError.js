const isConflict = ({ name, code }) =>
  name === "MongoServerError" && code === 11000;

const handleSchemaValidationError = (err, data, next) => {
  const { name, code } = err;
  err.status = isConflict(err) ? 409 : 400;

  // console.log("!!!!!!!!!!!! error Handle");
  console.log("name: ", name);
  console.log("code: ", code);

  next();
};

module.exports = handleSchemaValidationError;
