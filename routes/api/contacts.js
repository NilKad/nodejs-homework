const express = require("express");
const { contacts: ctrl } = require("../../controllers");

const { validation, ctrlWrapper } = require("../../middleWares");
const { joiContactSchema } = require("../../models/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get(
  "/:contactId",
  // validation(idContactSchema),
  ctrlWrapper(ctrl.getById)
);

router.post(
  "/",
  // validation(idContactSchema),
  validation(joiContactSchema),
  ctrlWrapper(ctrl.add)
);

router.put(
  "/:contactId",
  validation(joiContactSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  // validation(idContactSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete(
  "/:contactId",
  // validation(idContactSchema),
  ctrlWrapper(ctrl.removeById)
);

module.exports = router;
