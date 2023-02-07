const express = require("express");
// const { ctrlWrapper, auth, uploadFile } = require("../../middleWares");
const { ctrlWrapper, auth } = require("../../middleWares");
const { users: ctrl } = require("../../controllers");
const upload = require("../../middleWares/uploadFile");

const router = express.Router();

router.post("/signup", ctrlWrapper(ctrl.signup));

router.get("/signin", ctrlWrapper(ctrl.signin));

router.get("/current", ctrlWrapper(auth), ctrlWrapper(ctrl.getCurrent));

router.get("/logout", ctrlWrapper(auth), ctrlWrapper(ctrl.logout));

router.patch(
  "/avatars",
  ctrlWrapper(auth),
  // uploadFile.single("avatar"),
  upload.avatar,
  ctrlWrapper(ctrl.updateAvatar)
);
router.patch("/:userId", ctrlWrapper(auth), ctrlWrapper(ctrl.updateUser));

module.exports = router;
