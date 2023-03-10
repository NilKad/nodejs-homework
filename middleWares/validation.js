const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    next();
    // return true;
  };
};

// const validationId = (schema) => {
//   return (req, res, next) => {
//     const { error } = schema.validate(req.params);
//     if (error) {
//       error.status = 400;
//       throw error;
//     }
//     next();
//   };
// };

module.exports = { validation };
