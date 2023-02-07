const multer = require("multer");
const path = require("path");
// const UPLOAD_DIR = path.join(__dirname, process.env.UPLOAD_DIR);
// const tempDir = path.join(__dirname, "..", process.env.TEMP_DIR);
// const tempDir = path.join(__dirname, "..", process.env.TEMP_DIR);

// function uploadFile(req, res, next) {
const uploadFile = (req, res, next) => {
  // const multer = require("multer");
  // const path = require("path");
  const tempDir = path.join(process.cwd(), process.env.TEMP_DIR);

  console.log("!!!!!UploadFile");
  console.log("!!!!!UploadFile tempDir:\t", tempDir);

  // console.log("!uploadFile, req.file:\t", req.file);
  // console.log("!uploadFile, req:\t", req);

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
  }).single("avatar");
  // console.log("UPLOAD!!:", upload);
  // console.log("!!UploadFile req.file do: ", req.file);

  // const upload = multer({ storage: storage });
  // console.log("!!UploadFile req.file do: ", req.files);

  // const uploadA = upload.single("avatar");
  upload(req, res, function (err) {
    if (err) console.log(err);
  });

  // console.log("!!UploadFile req.file after single: ", req.files);
  // upload;
  // return upload;
  // res.json({ DATA: req });
  // upload.single("avatar");
  next();

  // return { req, res, next };
  // return (req, res, next) => upload;
};

module.exports = uploadFile;
// module.exports.upload = upload;
