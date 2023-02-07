const express = require("express");
const { ctrlWrapper, auth } = require("../../middleWares");
const { users: ctrl } = require("../../controllers");
const uploadFile = require("./uploadFile");
// const upload = require("./UploadFile");

// const multer = require("multer");
// const path = require("path");
// const tempDir = path.join(process.cwd(), process.env.TEMP_DIR);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, tempDir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: "3M",
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.includes("image")) {
//       cb(null, true);
//     }
//     cb(null, false);
//   },
// });

const router = express.Router();

router.post("/signup", ctrlWrapper(ctrl.signup));

router.get("/signin", ctrlWrapper(ctrl.signin));

router.get("/current", ctrlWrapper(auth), ctrlWrapper(ctrl.getCurrent));

router.get("/logout", ctrlWrapper(auth), ctrlWrapper(ctrl.logout));

router.patch(
  "/avatars",
  ctrlWrapper(auth),
  // uploadFile,
  // ctrl.updateAvatar
  // ctrlWrapper(uploadFile)
  // UploadFile,
  // (req, res, next) => uploadFile,
  uploadFile,
  // upload.single("avatar"),
  // uploadFile.single("avatar"),
  // uploadFile(req, res, next, "avatar")
  ctrlWrapper(ctrl.updateAvatar)
);
router.patch("/:userId", ctrlWrapper(auth), ctrlWrapper(ctrl.updateUser));

module.exports = router;
