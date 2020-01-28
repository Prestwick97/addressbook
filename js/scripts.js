// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, Address ) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.email = email,
  this.Address = Address
}
function Address(work, home, remote) {
  this.work = work,
  this.home = home,
  this.remote = remote
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.email);
  $(".home").html(contact.Address.home);
  $(".work").html(contact.Address.work);
  $(".remote").html(contact.Address.remote);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}


function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  // Code below here is new!
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};




$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmail = $("input#new-email-address").val();
    var inputtedWork = $("input#new-work").val();
    var inputtedHome = $("input#new-home").val();
    var inputtedRemote = $("input#new-remote").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-work").val("");
    $("input#new-home").val("");
    $("input#new-remote").val("");

    function removeEmptyFields() {
      if(inputtedFirstName === "") {
        $("#1").remove();  
      }
      if(inputtedLastName === ""){
        $("#2").remove();
      }
       if(inputtedPhoneNumber === ""){
        $("#3").remove();
      }
       if(inputtedEmail === ""){
        $("#4").remove();
      }
       if(inputtedWork === ""){
        $("#5").remove();
      }
       if(inputtedHome === ""){
        $("#6").remove();
      }
       if(inputtedRemote === ""){
        $("#7").remove();
      }
    };
    

    removeEmptyFields();

    var inputtedAddress = new Address(inputtedWork, inputtedHome, inputtedRemote);

    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, inputtedAddress)
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
    
  
    // if ("span" === "" ) {
    //   $(this).parent('p').remove();
    // }
    // $( 'span:empty' ).remove($(this).parent('p'));

  })


})