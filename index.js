const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listOfContacts = await contacts.listContacts();
      return console.table(listOfContacts);
      break;

    case "get":
      const oneContact = await contacts.getContactById(id);
      return console.table(oneContact);
      break;

    case "add":
      const addition = await contacts.addContact(name, email, phone);
      return console.table(addition);
      break;

    case "remove":
      const remCon = await contacts.removeContact(id);
      return console.table(remCon);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv).catch(console.error);
