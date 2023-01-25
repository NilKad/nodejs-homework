const nullQuery = (arg) => {
  if (!arg) {
    const err = new Error("not found");
    err.status = 404;
    throw err;
  }
  return true;
};

module.exports = nullQuery;
