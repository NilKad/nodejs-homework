const express = require("express");
const { ctrlWrapper } = require("../../middleWares");
const { users: ctrl } = require("../../controllers");
const { auth } = require("../../middleWares");

const router = express.Router();

router.get("/", ctrlWrapper(auth), ctrlWrapper(ctrl.getCurrent));

module.exports = router;
