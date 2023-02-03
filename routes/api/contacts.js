const express = require("express");
const { contacts: ctrl } = require("../../controllers");

const {
  auth,
  validation,
  ctrlWrapper,
  isValidId,
} = require("../../middleWares");
const { joiContactSchema } = require("../../models/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(auth), ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(auth), ctrlWrapper(ctrl.getById));

router.post(
  "/",
  ctrlWrapper(auth),
  validation(joiContactSchema),
  ctrlWrapper(ctrl.add)
);

router.put(
  "/:contactId",
  ctrlWrapper(auth),
  isValidId,
  validation(joiContactSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  ctrlWrapper(auth),
  isValidId,
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete(
  "/:contactId",
  ctrlWrapper(auth),
  isValidId,
  ctrlWrapper(ctrl.removeById)
);

module.exports = router;
