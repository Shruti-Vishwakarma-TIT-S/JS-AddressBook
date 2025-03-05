// Define a Contact class to represent individual contact information
class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
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
    addContact(contact) {
      this.contacts.push(contact);
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
  }
  
  // Example usage of the AddressBook and Contact classes
  
  // Create an instance of AddressBook
  const addressBook = new AddressBook();
  
  // Add a new contact (single-line version for compactness)
  addressBook.addContact(new Contact("Jasmine", "Bake", "123 Mango street", "Shimla", "Kashmir", "62704", "555-1234", "bake@example.com"));
  
  // Add another contact
  addressBook.addContact(new Contact("Sujal", "Rathore", "456 Town", "Kolkata", "WB", "60616", "555-5678", "sujal@example.com"));
  
  // List all contacts in the address book
  console.log("Address Book:");
  addressBook.listContacts();
  
  // Search for a specific contact by name
  const searchedContacts = addressBook.searchContact("Sujal", "Rathore");
  console.log("\nSearch Result:");
  searchedContacts.forEach((contact) => console.log(contact.displayInfo()));
  
  // Remove a contact by name
  addressBook.removeContact("Sujal", "Rathore");
  
  // List all contacts after removing one
  console.log("\nAddress Book After Deletion:");
  addressBook.listContacts();
  