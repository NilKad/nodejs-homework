const multer = require("multer");
const path = require("path");
const tempDir = path.join(process.cwd(), process.env.TEMP_DIR);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadAvatar = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
    }
    cb(null, false);
  },
}).single("avatar");

const uploadDOC = multer({
  storage: storage,
  limits: { fileSize: 15000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("aplication")) {
      cb(null, true);
    }
    cb(null, false);
  },
}).single("doc");

// module.exports = upload;
module.exports.avatar = uploadAvatar;
module.exports.docs = uploadDOC;
