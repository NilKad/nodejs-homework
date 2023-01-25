const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsDB = "contacts.json";
const contactsPath = path.join(__dirname, "..", "db", contactsDB);

const listContacts = async () => {
  let result = null;
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    result = await JSON.parse(data);
  } catch (error) {
    console.log("error list contacts: ", error);
    throw error;
  }
  return result;
};

const getContactById = async (contactId) => {
  let result = null;
  try {
    const data = await listContacts();
    result = data.find((e) => e.id === contactId);
    if (!result) {
      return null;
    }
  } catch (error) {
    console.log("!!!!Models CATCH getContactById");
    throw error;
  }
  return result;
};

const removeContact = async (contactId) => {
  let deletedContact = null;
  if (!contactId) {
    return null;
  }
  try {
    const data = await listContacts();
    deletedContact = data.find((e) => e.id === contactId);
    if (!deletedContact) {
      return null;
    }
    const result = data.filter((e) => e.id !== contactId);
    const forWrite = JSON.stringify(result, null, 2);
    await fs.writeFile(contactsPath, forWrite, "utf8");
  } catch (error) {
    console.log("error list contacts: ", error);
    throw error;
  }
  return deletedContact;
};

const addContact = async (body) => {
  let newContact = null;
  try {
    const data = await listContacts();
    newContact = { id: v4(), ...body };
    data.push(newContact);
    const forWrite = JSON.stringify(data, null, 2);
    await fs.writeFile(contactsPath, forWrite, "utf8");
  } catch (error) {
    console.log(error);
    throw error;
  }
  return newContact;
};

const updateContact = async (contactId, body) => {
  let updateContact = null;
  try {
    console.log("!!! START TRY updateContact ");

    const currentContact = await getContactById(contactId);
    if (!currentContact) return null;
    console.log("updateContact currentContact: ", currentContact);
    updateContact = { ...currentContact, ...body };
    const data = await listContacts();
    const newData = data.map((e) => {
      if (e.id === contactId) {
        return { ...updateContact };
      }
      return e;
    });
    const forWrite = JSON.stringify(newData, null, 2);
    await fs.writeFile(contactsPath, forWrite, "utf8");
  } catch (error) {
    console.log("!!!!Models CATCH updateContact");
    throw error;
  }
  return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
