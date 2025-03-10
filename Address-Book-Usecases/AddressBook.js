// Define a Contact class to represent individual contact information
class Contact {
  constructor(firstName, lastName, address, city, state, zip, phone, email) {


    // UC2: Validate inputs before initializing properties
    if (!/^[A-Z][a-zA-Z]{2,}$/.test(firstName)) {
      throw new Error("First Name must start with a capital letter and have at least 3 characters.");
    }
    if (!/^[A-Z][a-zA-Z]{2,}$/.test(lastName)) {
      throw new Error("Last Name must start with a capital letter and have at least 3 characters.");
    }
    if (address.length < 4) {
      throw new Error("Address must have at least 4 characters.");
    }
    if (city.length < 4) {
      throw new Error("City must have at least 4 characters.");
    }
    if (state.length < 4) {
      throw new Error("State must have at least 4 characters.");
    }
    if (!/^\d{5,6}$/.test(zip)) {
      throw new Error("Zip must be a valid 5 or 6 digit code.");
    }
    if (!/^\d{10}$/.test(phone)) {
      throw new Error("Phone number must be a 10-digit number.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Email must be a valid format (e.g., example@example.com).");
    }

    // UC1: Use the provided contact information to initialize a new Contact object
    // Initialize the properties of a contact
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.phone = phone;
    this.email = email;
  }

  // Method to display contact information in a readable format
  displayInfo() {
    return `${this.firstName} ${this.lastName}, ${this.address}, ${this.city}, ${this.state} - ${this.zip}, Phone: ${this.phone}, Email: ${this.email}`;
  }
}

// Define an AddressBook class to manage multiple contacts
class AddressBook {
  constructor() {
    // Initialize an empty array to store contacts
    this.contacts = [];
  }

  // Add a new contact to the address book
  // UC3: Add a new contact to the address book with UC7 duplicate check
  addContact(contact) {
  // UC7: Check for duplicates using filter
    const isDuplicate = this.contacts.filter(
      (existingContact) =>
        existingContact.firstName.toLowerCase() === contact.firstName.toLowerCase() &&
        existingContact.lastName.toLowerCase() === contact.lastName.toLowerCase()
    ).length > 0;

    if (isDuplicate) {
      console.error(`Duplicate Entry: A contact with the name ${contact.firstName} ${contact.lastName} already exists.`);
      return;
    }

    // If not duplicate, add the contact
    this.contacts.push(contact);
    console.log(`Contact added: ${contact.displayInfo()}`);
  }

  // List all contacts in the address book
  listContacts() {
    this.contacts.forEach((contact, index) => {
      console.log(`Contact ${index + 1}: ${contact.displayInfo()}`);
    });
  }

  // Search for a contact by first and last name
  searchContact(firstName, lastName) {
    return this.contacts.filter(
      (contact) =>
        contact.firstName.toLowerCase() === firstName.toLowerCase() &&
        contact.lastName.toLowerCase() === lastName.toLowerCase()
    );
  }

  // Remove a contact by first and last name
  removeContact(firstName, lastName) {
    this.contacts = this.contacts.filter(
      (contact) =>
        contact.firstName.toLowerCase() !== firstName.toLowerCase() ||
        contact.lastName.toLowerCase() !== lastName.toLowerCase()
    );
  }

  // UC4: Find an existing contact by name and edit it
  editContact(firstName, lastName, updatedFields) {
    const contact = this.contacts.find(
      (contact) =>
        contact.firstName.toLowerCase() === firstName.toLowerCase() &&
        contact.lastName.toLowerCase() === lastName.toLowerCase()
    );
    if (contact) {
      Object.assign(contact, updatedFields); // Update the contact's fields with the new data
      console.log(`Contact updated: ${contact.displayInfo()}`);
    } else {
      console.error("Contact not found.");
    }
  }

  // UC5: Find a person by name and delete them from the array
  deleteContact(firstName, lastName) {
  const initialLength = this.contacts.length;
    this.contacts = this.contacts.filter(
      (contact) =>
        contact.firstName.toLowerCase() !== firstName.toLowerCase() ||
        contact.lastName.toLowerCase() !== lastName.toLowerCase()
    );
    if (this.contacts.length < initialLength) {
      console.log(`Contact deleted: ${firstName} ${lastName}`);
    } else {
      console.error(`Contact not found: ${firstName} ${lastName}`);
    }
  }

  // UC6: Find the number of contacts in the address book using reduce
  getContactCount() {
    return this.contacts.reduce((count) => count + 1, 0); // Reduce function counts all contacts
  }
  // UC8: Search for persons in a particular city or state
  searchByCityOrState(locationType, locationValue) {
    const filteredContacts = this.contacts.filter((contact) =>
      locationType.toLowerCase() === "city"
        ? contact.city.toLowerCase() === locationValue.toLowerCase()
        : contact.state.toLowerCase() === locationValue.toLowerCase()
    );

    if (filteredContacts.length > 0) {
      console.log(`Contacts in ${locationValue} (${locationType}):`);
      filteredContacts.forEach((contact) => console.log(contact.displayInfo()));
    } else {
      console.log(`No contacts found in ${locationValue} (${locationType}).`);
    }
  }

  // UC9: View persons grouped by City or State
  viewPersonsByCityOrState(locationType) {
    const groupedContacts = this.contacts.reduce((grouped, contact) => {
      const key = locationType.toLowerCase() === "city" ? contact.city : contact.state;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(contact);
      return grouped;
    }, {});

    // Display the grouped contacts
    for (const [key, persons] of Object.entries(groupedContacts)) {
      console.log(`\n${locationType}: ${key}`);
      persons.forEach((person) => console.log(person.displayInfo()));
    }
  }

  // UC10: Count contacts by City
  countByCity() {
    const countByCity = this.contacts.reduce((acc, contact) => {
      acc[contact.city] = (acc[contact.city] || 0) + 1;
      return acc;
    }, {});
    console.log("\nCount of Contacts by City:");
    console.log(countByCity);
    return countByCity;
  }

  // UC10: Count contacts by State
  countByState() {
    const countByState = this.contacts.reduce((acc, contact) => {
      acc[contact.state] = (acc[contact.state] || 0) + 1;
      return acc;
    }, {});
    console.log("\nCount of Contacts by State:");
    console.log(countByState);
    return countByState;
  }
  // UC11: Sort contacts alphabetically by name
  sortContactsByName() {
    this.contacts.sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      return nameA.localeCompare(nameB);
    });

    console.log("\nSorted Contacts Alphabetically by Name:");
    this.contacts.forEach((contact) => console.log(contact.toString()));
  }
  // UC 12: Sort entries by City
  sortByCity() {
    this.contacts.sort((a, b) => a.city.toLowerCase().localeCompare(b.city.toLowerCase()));
    console.log("\nContacts Sorted by City:");
    this.contacts.forEach((contact) => console.log(contact.toString()));
  }

  // UC 12: Sort entries by State
  sortByState() {
    this.contacts.sort((a, b) => a.state.toLowerCase().localeCompare(b.state.toLowerCase()));
    console.log("\nContacts Sorted by State:");
    this.contacts.forEach((contact) => console.log(contact.toString()));
  }

  // UC 12: Sort entries by Zip
  sortByZip() {
    this.contacts.sort((a, b) => a.zip.localeCompare(b.zip)); // Compare zip codes as strings
    console.log("\nContacts Sorted by Zip:");
    this.contacts.forEach((contact) => console.log(contact.toString()));
  }
}

// Create an instance of AddressBook
const addressBook = new AddressBook();

// UC2 : Test adding and removing contacts with invalid inputs 
try {
 // Add contacts
  addressBook.addContact(new Contact("Jasmine", "Bake", "123 Mango street", "Shimla", "Himachal Pradesh", "62704", "5551234567", "bake@example.com"));
  addressBook.addContact(new Contact("Sujal", "Rathore", "456 Town", "Kolkata", "West Bengal", "60616", "5555678123", "sujal@example.com"));
  addressBook.addContact(new Contact("Amit", "Sharma", "789 Orange Street", "Shimla", "Himachal Pradesh", "62705", "5559876543", "amit@example.com"));
  // Add an invalid contact to test validation
  try {
    addressBook.addContact(new Contact("Ja", "B", "12 St", "Ci", "St", "abc", "12345", "invalid-email")); // Invalid contact
  } catch (error) {
    console.error(`Failed to add contact: ${error.message}`); // Handle invalid input gracefully
  }

  // UC4 Edit an existing contact
  console.log("\nEditing Contact:");
  addressBook.editContact("Jasmine", "Bake", { address: "789 Orange St", city: "Manali", phone: "5559876543" });
  
  // List all contacts after editing
  console.log("\nAddress Book After Editing:");
  addressBook.listContacts();

  // UC6: Get the count of contacts using the reduce function
  console.log(`\nNumber of Contacts in Address Book: ${addressBook.getContactCount()}`);

  // UC5: Delete an existing contact
  console.log("\nDeleting Contact:");
  addressBook.deleteContact("Jasmine", "Bake");

  // UC8: Search for contacts in Shimla (city)
  console.log("\nSearching for contacts in Shimla (City):");
  addressBook.searchByCityOrState("city", "Shimla");

  // UC8: Search for contacts in West Bengal (state)
  console.log("\nSearching for contacts in West Bengal (State):");
  addressBook.searchByCityOrState("state", "West Bengal");

  // UC9: View persons grouped by City
  console.log("\nViewing Persons Grouped by City:");
  addressBook.viewPersonsByCityOrState("city");

  // UC9: View persons grouped by State
  console.log("\nViewing Persons Grouped by State:");
  addressBook.viewPersonsByCityOrState("state");
  
  // UC10: Count by City
  addressBook.countByCity();

  // UC10: Count by State
  addressBook.countByState
  
  // UC11: Sort contacts alphabetically by name
  addressBook.sortContactsByName();

  // UC12: Sort by City
  addressBook.sortByCity();

  // UC12: Sort by State
  addressBook.sortByState();

  // UC12: Sort by Zip
  addressBook.sortByZip();
} 
catch (error) {
  console.error(error.message);
}

// List all contacts in the address book
console.log("\nAddress Book:");
addressBook.listContacts();

// Search for a specific contact by name
const searchedContacts = addressBook.searchContact("Jasmine", "Bake");
console.log("\nSearch Result:");
searchedContacts.forEach((contact) => console.log(contact.displayInfo()));

// Remove a contact by name
addressBook.removeContact("Jasmine", "Bake");

// List all contacts after removing one
console.log("\nAddress Book After Deletion:");
addressBook.listContacts();
