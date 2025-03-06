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
  // UC3 Add a new contact to the address book
  addContact(contact) {
    try {
      this.contacts.push(contact); // UC2: Handle invalid contacts gracefully
    } catch (error) {
      console.error(`Failed to add contact: ${error.message}`); // UC2: Display error message
    }
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
}

// Create an instance of AddressBook
const addressBook = new AddressBook();

// UC2 : Test adding and removing contacts with invalid inputs
 
try {
  // Add a valid contact
  addressBook.addContact(new Contact("Jasmine", "Bake", "123 Mango street", "Shimla", "Kashmir", "62704", "5551234567", "bake@example.com"));

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

  // UC5: Delete an existing contact
  console.log("\nDeleting Contact:");
  addressBook.deleteContact("Jasmine", "Bake");
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
