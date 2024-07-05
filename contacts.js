const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.format({
  dir: path.dirname("./db/contacts.json"),
  base: path.basename("./db/contacts.json"),
});

async function listContacts() {
  try {
    const file = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(file);
  } catch (err) {
    console.error(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contactsList = await listContacts();
    const contact = contactsList.find((contact) => contact.id === contactId);
    console.log(contact);
  } catch (err) {
    console.error(err.message);
  }
}

async function removeContact(contactId) {
  try {
    let contactsList = await listContacts();
    const newList = contactsList.filter((contact) => contact.id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(newList));
    contactsList = await listContacts();

    console.log(contactsList);
  } catch (err) {
    console.error(err.message);
  }
}

async function addContacts(name, email, phone) {
  try {
    let contactsList = await listContacts();

    const newContact = {
      id: String(contactsList.length + 1),
      name,
      email,
      phone,
    };

    contactsList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList));
    contactsList = await listContacts();

    console.log(contactsList);
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = { listContacts, getContactById, addContacts, removeContact };
