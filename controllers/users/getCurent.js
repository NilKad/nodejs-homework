const getCurrent = (req, res, next) => {
  //
  console.log("!!!!!get curent");
  // console.log("req.user: ", req.user);
  const { user } = req;

  const { email, subscription } = user;
  res.status(200).json({
    code: 200,
    status: "success",
    data: { user: { email, subscription } },
  });
};

module.exports = getCurrent;
