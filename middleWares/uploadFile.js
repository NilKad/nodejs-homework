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

const upload = multer({
  storage: storage,
  limits: "3M",
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
    }
    cb(null, false);
  },
});

module.exports = upload;
