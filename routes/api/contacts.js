const express = require("express");
const Joi = require("joi");
const contactsOperations = require("../../models/contacts.js");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactValidate = (body) => {
  const { error } = contactSchema.validate(body);
  if (error) {
    error.status = 400;
    throw error;
  }
  return true;
};

const nullQuery = (arg) => {
  if (!arg) {
    const err = new Error("not found");
    err.status = 404;
    throw err;
  }
  return true;
};

router.get("/", async (req, res, next) => {
  let data = null;

  try {
    data = await contactsOperations.listContacts();
  } catch (error) {
    console.log("error routes", error);
    next(error);
    return;
  }
  console.log("!!!!!!!!!!!!!!!!! GET");
  res.json({ message: "read all contacts", data });
});

router.get("/:contactId", async (req, res, next) => {
  let data = null;
  const { contactId } = req.params;

  try {
    data = await contactsOperations.getContactById(contactId);
    nullQuery(data);
  } catch (error) {
    console.log("!!!!Router CATCH GET/:contactId");
    next(error);
    return;
  }
  res.json({ message: "read contacts by ID", data });
});

router.post("/", async (req, res, next) => {
  let data = null;
  const body = req.body;
  console.log("post req.params", body);

  try {
    contactValidate(body);
    data = await contactsOperations.addContact(body);
    nullQuery(data);
    res.status(201);
  } catch (error) {
    console.log("!!!!!!POST CATCH");
    console.log("!!!!!!POST ERROR.MESSAGE: ", error.message);
    next(error);
    return;
  }
  console.log("!!!!!!POST END");
  res.json({ message: "contacts added", data });
});

router.delete("/:contactId", async (req, res, next) => {
  let data = null;
  const { contactId } = req.params;

  try {
    data = await contactsOperations.removeContact(contactId);
    nullQuery(data);
    res.status(200);
  } catch (error) {
    next(error);
    return;
  }
  res.json({ message: "template message", data });
});

router.put("/:contactId", async (req, res, next) => {
  let data = null;
  const { contactId } = req.params;
  const body = req.body;
  try {
    contactValidate(body);
    data = await contactsOperations.updateContact(contactId, body);
    nullQuery(data);
    res.status(200);
  } catch (error) {
    // console.log(error);
    next(error);
    return;
  }
  res.json({ message: "update success", data });
});

module.exports = router;
