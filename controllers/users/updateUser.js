const { User } = require("../../models");
const { nullQuery } = require("../contacts");

const updateUser = async (req, res, next) => {
  let data = null;
  const { userId } = req.params;
  const user = await User.findById(userId, "-createdAt -updatedAt -token");

  nullQuery(user);

  const queryObject = {};
  const { subscription = null } = req.body;

  if (user.subscription === subscription) {
    return res.status(400).json({
      code: 400,
      message: `UserID ${userId} subscription dont need update`,
    });
  }
  if (subscription !== null) queryObject.subscription = subscription;

  data = await User.findByIdAndUpdate(userId, queryObject, {
    new: true,
    runValidators: true,
    projection: "-createdAt -updatedAt -token",
  });
  nullQuery(data);
  res.status(200);
  res.json({ message: "update success", data });
};

module.exports = updateUser;
