const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = await contacts.find(({ id }) => id == contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const newContacts = await contacts.filter(({ id }) => id != contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return newContacts;
};

const addContact = async (name, email, phone) => {
  const currentContacts = await listContacts();

  const newContact = {
    id: nanoid(5),
    name,
    email,
    phone,
  };
  currentContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(currentContacts, null, 2));
  return newContact;
};

module.exports = {
  getContactById,
  removeContact,
  addContact,
  listContacts,
};
