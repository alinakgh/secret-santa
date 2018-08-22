import { Contacts, Permissions } from "expo";

let santasAddressBook = null;

export default async function getAddressBook() {
  if (!santasAddressBook) {
    console.log("should only see this once");

    // Ask for permission to query contacts
    const permission = await Permissions.askAsync(Permissions.CONTACTS);
    if (permission.status !== "granted") {
      // Permission was denied...
      return;
    }

    const contactResponse = await Contacts.getContactsAsync({
      fields: [
        Contacts.PHONE_NUMBERS
        // Contacts.EMAILS,
      ],
      pageSize: 500,
      pageOffset: 0 * 100
    });

    santasAddressBook = contactResponse.data.sort(sortingFunction);

    console.log(`Fetched ${santasAddressBook.length} contacts.`);
  }

  return santasAddressBook;
}

function sortingFunction(a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
}

/*

// think about encapsulation of methods
export default class SantasAddressBook {
  constructor(props) {
    if(!instance){
      console.log('should only see this once');
      instance = this;

      this.state = {
        phoneBook : [],
        selectedContacts : [],
        manualContacts : []
      };

      this.getPhoneBook();
    }

    return instance;
  }

  // maybe think about types
  getPhoneBook = async () => {
    
    if(this.state.phoneBook.length === 0) {
        console.log('SantaBook is empty, populating it...');
        await this.getContacts()
          .then(() => console.log('Book length is', this.state.phoneBook.length));
    } 

    return this.state.phoneBook;
  }

  getAllSelectedContacts = () => {
    return this.state.selectedContacts;
  }

  addManualContact = (number, alias) => {
    newContact = {
      name : '',
      alias : alias,
      phoneNumber : number
    };

    manualContacts.push(newContact);
  }

  getSelectedContacts = async () => {
    return this.state.selectedContacts;
  }

  setSelectedContacts = (selectedContacts) => {
    this.state.selectedContacts = selectedContacts;
  }

  // HELPER METHODS




}

*/
