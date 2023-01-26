const express = require("express");
const { contacts: ctrl } = require("../../controllers");

const { validation, ctrlWrapper } = require("../../middleWares");
const { contactsSchema } = require("../../schemas");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(contactsSchema), ctrlWrapper(ctrl.add));

router.put(
  "/:contactId",
  validation(contactsSchema),
  ctrlWrapper(ctrl.updateById)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

module.exports = router;
