// var App = (function($){
  var Book = {};

  // BUTTONS >>>>>>>>>>>>>>>>>>>> //
  var btnQuickAdd = document.getElementById('quickAdd'),
      btnAddContact = document.getElementById('addContact'),
      btnCancel = document.getElementById('cancel');

  //  FORMS >>>>>>>>>>>>>>>>>>>> //
  var divQuickAddForm = document.getElementById('quickAddForm');

  // FORM FIELDS >>>>>>>>>>>>>>>>>>>> //
  var fullName = document.getElementById('fullName'),
      phone = document.getElementById('phone'),
      address = document.getElementById('address'),
      city = document.getElementById('city'),
      email = document.getElementById('email');

  // ADDRESS BOOK DISPLAY >>>>>>>>>>>>>>>>>>>> //
  var divAddressBook = document.getElementById('divAddBook');
  console.log( 'divAddressBook: ' + JSON.stringify(divAddressBook) );

  // STORAGE ARRAY >>>>>>>>>>>>>>>>>>>> //
  var arrAddressBook = [];

  // EVENT LISTENERS >>>>>>>>>>>>>>>>>>>> //
  btnQuickAdd.addEventListener('click', function () {
    console.log('Add button clicked');
    show(divQuickAddForm);
  });

  btnCancel.addEventListener('click', function () {
    console.log('cancel button clicked');
    hide(divQuickAddForm);
  });

  btnAddContact.addEventListener('click', addContact);

  divAddressBook.addEventListener('click', removeContact);

  // FUNCTIONS >>>>>>>>>>>>>>>>>>>> //
  function addContact () {
    console.log('add contact clicked');
    var isNull = fullName.value === "" &&
      phone.value === "" &&
      address.value === "" &&
      city.value === "" &&
      email.value === "";

    console.log('isNull: ' + isNull);

    if (!isNull) {
      console.log('contact added to local storage');
      // var obj = new jsonStructure(fullname.value, phone.value, address.value, city.value, email.value);
      var contact = {};
      contact.fullName = fullName.value;
      contact.phone = phone.value;
      contact.address = address.value;
      contact.city = city.value;
      contact.email = email.value;

      arrAddressBook.push(contact);
      localStorage.addressBook = JSON.stringify(arrAddressBook);
      clearForm();
    }
  }

  function clearForm () {
    console.log('clearform called');
    var frm = document.querySelectorAll('divQuickAddForm');
    console.log( 'frm: ' + JSON.stringify(frm) );
    for ( var i in frm ) {
      frm[i].value = '';
    }
  }

  function showAddressBook () {
    console.log("localStorage.addressBook: " + localStorage.addressBook);
    if ( localStorage.addressBook === undefined ) {
      localStorage.addressBook = '[]';
    } else {
      addressBook = JSON.parse(localStorage.addressBook);
      divAddressBook.innerHTML = '';
      for ( var n in addressBook ) {
        var str = '<div class="entry">';
            str += '<div class="name"><p>' + addressBook[n].fullName + '</p></div>';
            str += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
            str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
            str += '<div class="address"><p>' + addressBook[n].address + '</p></div>';
            str += '<div class="city"><p>' + addressBook[n].city + '</p></div>';
            str += '<div class="delete"><a href="#" class="btnDelete" data-id="' + n + '">Delete</a> </div>';
            str += '</div>';
            divAddressBook.innerHTML = str;
      }
    }
  }

  function removeContact (e) {
      console.log('removeContact called');
      if ( e.target.classList.contains('btnDelete')) {
        var remID = e.target.getAttribute('data-id');
        arrAddressBook.splice(remID,1);
        localStorage.addressBook = JSON.stringify(arrAddressBook);
      }
  }

  function show (el) {
    el.className = "";
  }

  function hide (el) {
    el.className = "hidden";
  }

  // return Book;

// })(jQuery);

$(document).ready(function () {
  console.log('document is ready');
  showAddressBook();
});
