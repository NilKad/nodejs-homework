const express = require("express");
const { contacts: ctrl } = require("../../controllers");

const { validation, ctrlWrapper, validationId } = require("../../middleWares");
const { joiContactSchema, idContactSchema } = require("../../models/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get(
  "/:contactId",
  validationId(idContactSchema),
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
  validationId(idContactSchema),
  validation(joiContactSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  validationId(idContactSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete(
  "/:contactId",
  validationId(idContactSchema),
  ctrlWrapper(ctrl.removeById)
);

module.exports = router;
