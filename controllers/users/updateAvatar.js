const path = require("path");
const Jimp = require("jimp");

const avatarsDir = process.env.AVATARS_DIR;
const fs = require("fs/promises");
const { User } = require("../../models");
const prefixNewPath = path.join(process.cwd(), "public", avatarsDir);

const updateAvatar = async (req, res, next) => {
  const { _id: id } = req.user;
  if (req.file) {
    const { originalname, path: fullPath } = req.file;
    const [extension] = originalname.split(".").reverse();
    const fullAvatarURL = path.join(prefixNewPath, `${id}-avatar.${extension}`);
    const avatarURL = path.join(avatarsDir, `${id}-avatar.${extension}`);

    const img = await Jimp.read(fullPath);
    // try {
    //   await fs.unlink(req.user.avatarURL);
    // } catch (error) {
    //   console.log(error);
    // }
    await img.autocrop().cover(250, 250).writeAsync(fullPath);
    await fs.rename(fullPath, fullAvatarURL);
    const data = await User.findByIdAndUpdate(
      id,
      { avatarURL: avatarURL },
      {
        new: true,
        runValidators: true,
        projection: "-createdAt -updatedAt -token -password",
      }
    );
    return res.status(200).json({ code: 200, message: "Update success", data });
  }
  res.status(401).json({ code: 401, message: "Not authorized" });
};

module.exports = updateAvatar;
