const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contactById = String(contactId);
  const contacts = await listContacts();
  const contact = await contacts.find(({ id }) => id === contactById);
  return contact;
};

const removeContact = async (contactId) => {
  const contactById = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactById);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (data) => {
  const currentContacts = await listContacts();

  const newContact = {
    id: nanoid(5),
    ...data,
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
