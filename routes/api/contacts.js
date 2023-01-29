const express = require("express");
const { contacts: ctrl } = require("../../controllers");

const { validation, ctrlWrapper, isValidId } = require("../../middleWares");
const { joiContactSchema } = require("../../models/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(joiContactSchema), ctrlWrapper(ctrl.add));

router.put(
  "/:contactId",
  isValidId,
  validation(joiContactSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
