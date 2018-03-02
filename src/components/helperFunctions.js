import {Contacts, Permissions} from 'expo';
import getSymbolFromCurrency from 'currency-symbol-map';


export function getBudgetText(budget, currency) {
	if(budget === 0)
		return 'unlimited';
	return getSymbolFromCurrency(currency).concat(budget)
}


let santasAddressBook = null;


export async function getAddressBook() {
	if(!santasAddressBook){
		console.log('should only see this once');

    // Ask for permission to query contacts 
    const permission = await Permissions.askAsync(Permissions.CONTACTS);
    if (permission.status !== 'granted') {
      // Permission was denied...
      return;
    }
    
    const contactResponse = await Contacts.getContactsAsync({
      fields: [
        Contacts.PHONE_NUMBERS,
        // Contacts.EMAILS,
      ],
      pageSize: 500,
      pageOffset: 0 * 100,
    });

    console.log("before sort");
    santasAddressBook = contactResponse.data.sort(sortingFunction);
    santasAddressBook = santasAddressBook.map((contact) => {
    	newContact = contact;
    	newContact.isSelected = false;

    	return newContact;
    });

    console.log(`Fetched ${santasAddressBook.length} contacts.`);
  }

	return santasAddressBook;
}

function sortingFunction (a, b) {
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
};