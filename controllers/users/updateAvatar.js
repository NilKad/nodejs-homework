const path = require("path");
const Jimp = require("jimp");

const avatarsDir = process.env.AVATARS_DIR;
const fs = require("fs/promises");
const { User } = require("../../models");
const newPath = path.join(process.cwd(), "public", avatarsDir);

const updateAvatar = async (req, res, next) => {
  console.log("!!!updateAvatar START");

  const { _id: id } = req.user;
  console.log("updateAvatar req.file", req.file);
  if (req.file) {
    const { originalname, path: fullPath } = req.file;
    const avatarURL = path.join(newPath, `${id}-${originalname}`);

    const img = await Jimp.read(fullPath);
    await img.autocrop().cover(250, 250).writeAsync(fullPath);
    // , (err, image) => {
    // if (err) throw err;
    // image.resize(250, 250);
    // image.write(fullPath);
    // return true;
    // next();
    // });

    await fs.rename(fullPath, avatarURL);
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
