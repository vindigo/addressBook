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
  var divAddBook = document.getElementById('divAddBook');

  // STORAGE ARRAY >>>>>>>>>>>>>>>>>>>> //
  var arrAddressBook = [];

  // EVENT LISTENERS >>>>>>>>>>>>>>>>>>>> //
  btnQuickAdd.addEventListener('click', function () {
    show(divQuickAddForm);
  });

  btnCancel.addEventListener('click', function () {
    hide(divQuickAddForm);
    clearForm();
  });

  btnAddContact.addEventListener('click', addContact);

  divAddBook.addEventListener('click', removeContact);

  // FUNCTIONS >>>>>>>>>>>>>>>>>>>> //
  function jsonStructure(fullName, phone, address, city, email) {
    this.fullName = fullName;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.email = email;
  }

  function addContact () {
    var isNull = fullName.value === "" &&
      phone.value === "" &&
      address.value === "" &&
      city.value === "" &&
      email.value === "";

    if (!isNull) {
      var contact = new jsonStructure(fullName.value, phone.value, address.value, city.value, email.value);

      arrAddressBook.push(contact);
      localStorage.addressBook = JSON.stringify(arrAddressBook);
      clearForm();
      hide(quickAddForm);
      // quickAddForm.style.display = "none";

      showAddressBook();
    }
  }

  function removeContact (e) {
      if ( e.target.classList.contains('btnDelete')) {
        var remID = e.target.getAttribute('data-id');
        arrAddressBook.splice(remID,1);
        localStorage.addressBook = JSON.stringify(arrAddressBook);
        showAddressBook();
      }
  }

  function clearForm () {
    var frm = document.querySelectorAll(".formField");
    for ( var i = 0; i < frm.length; i++ ) { frm[i].value = ''; }
  }

  function showAddressBook () {
    if ( localStorage.addressBook === undefined ) {
      localStorage.addressBook = '[]';
    } else {
      arrAddressBook = JSON.parse(localStorage.addressBook);
      divAddBook.innerHTML = '';
      for ( var i = 0; i < arrAddressBook.length; i++ ) {
        var str = '<div class="entry row">';
            str += '<div class="name"><p>' + arrAddressBook[i].fullName + '</p></div>';
            str += '<div class="email"><p>' + arrAddressBook[i].email + '</p></div>';
            str += '<div class="phone"><p>' + arrAddressBook[i].phone + '</p></div>';
            str += '<div class="address"><p>' + arrAddressBook[i].address + '</p></div>';
            str += '<div class="city"><p>' + arrAddressBook[i].city + '</p></div>';
            str += '<div class="delete"><p><a href="#" class="btnDelete" data-id="' + i + '">Delete</a></p></div>';
            str += '</div>';

            divAddBook.innerHTML += str;
      }
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
showAddressBook();
