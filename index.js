const {
  getContactById,
  removeContact,
  addContact,
  listContacts,
} = require("./contacts");

const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      return console.table(contacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      return console.table(contactById);
      break;

    case "add":
      const newContact = await addContact({ name, email, phone });
      return console.table(newContact);
      break;

    case "remove":
      const remContact = await removeContact(id);
      return console.table(remContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
