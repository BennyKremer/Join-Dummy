setURL("https://gruppe-373.developerakademie.net/smallest_backend_ever");

function loadArrayFromBackend() {
  todos = JSON.parse(backend.getItem('tasks')) || [];
}

function randomColor() {
  const colors = [
    '#75026e',
    '#059c16',
    '#000770',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function render() {
  document.querySelector('#btn-add-contact').addEventListener('click', function () {
    const nameInput = document.querySelector('#name-input');
    addContact(nameInput.value);
    nameInput.value = '';
  });
}



function addContact(fullName) {
  if (!fullName || !fullName.trim()) return;
  const contactDiv = document.createElement('div');
  contactDiv.className = 'contact-entry';
  const nameInitialDiv = document.createElement('div');
  nameInitialDiv.className = 'name-inital';
  nameInitialDiv.textContent = fullName.charAt(0);
  nameInitialDiv.style.backgroundColor = randomColor();
  const fullNameDiv = document.createElement('div');
  fullNameDiv.className = 'full-name';
  fullNameDiv.textContent = fullName;

  contactDiv.append(nameInitialDiv);
  contactDiv.append(fullNameDiv);
  document.querySelector('#contact-list').append(contactDiv);
}







function initGlobalVariables() {
  labelColors = [
    BG_COLOR_SUPERNOVA,
    BG_COLOR_TABASCO,
    BG_COLOR_WEBORANGE,
    BG_COLOR_BLAZEORANGE,
    BG_COLOR_MALACHITE,
    BG_COLOR_APPLE,
    BG_COLOR_CYAN_AQUA,
    BG_COLOR_CERULEAN,
    BG_COLOR_BLUE_RIBBON,
    BG_COLOR_JAVA,
    BG_COLOR_PURPLE_PIZZAZZ,
    BG_COLOR_HELIOTROPE,
    BG_COLOR_ELECTRIC_VIOLET,
  ];

  currentLabelColor = 0;

  last_id = "XX";
}

function initContacts() {
  console.log("initContacts()");
  initGlobalVariables();

  document.getElementById("contact-list").innerHTML = /*html*/`
  <button class="con_mobileViewAddContactButton hoverButton hoverEffect" onclick="newContact();">
                <span style="font-size: 21px; color: white;">New contact</span>
                <img src="./img/add_contact.png">
  </button>
  `;


  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    insertContactToContactList(i, contact);
  }
}

function insertContactToContactList(i, contact) {

  document.getElementById("contact-list").innerHTML += `
  <div id="${contact["letter"]}">
    <span id="label-${contact["letter"]} " class="con_alphabeticHints">${contact["letter"]}</span>
  </div>`;

  for (let i = 0; i < contact["names"].length; i++) {
    const element = contact["names"][i];
    const element2 = contact["lastNames"][i];
    const element3 = contact["mail"][i];
    const fName = element.charAt(0);
    const lName = element2.charAt(0);

    if (currentLabelColor >= labelColors.length) {
      currentLabelColor = 0;
    }

    const bgColor = labelColors[currentLabelColor];
    currentLabelColor++;
    let given_id = `${contact["letter"]}-${i}`;

    document.getElementById(
      `${contact["letter"]}`
    ).innerHTML += `<div id="${contact["letter"]}-${i}" class="con_contactListElement hoverEffect" onclick="contactClicked(id)">
      <span id="label-${contact["letter"]}-${i}" class="con_contactListElementLabel">${fName}${lName}</span>  
      <div>
        <span>${element} ${element2}</span>
        <span class="con_contactListElementEmail">${element3}</span>
      </div>
      
    </div>`;
    document.getElementById(
      `label-${contact["letter"]}-${i}`
    ).style.backgroundColor = bgColor;
  }
}


function newContact() {
  // alert("You wanna add new contact?!");
  document.getElementById('new-popup').classList.remove('d-none');
  document.getElementById('new-popup').style.visibility = 'visible';
  document.getElementById('new-popup').style.display = "flex";
  document.getElementById('new-popup-form').classList.remove('d-none');
}


function cancelAddNewContact() {
  document.getElementById('new-popup').classList.add('d-none');
  document.getElementById('new-popup').style.visibility = 'invisible';
  document.getElementById('new-popup').style.display = "none";
  document.getElementById('new-popup-form').classList.add('d-none');
}


function cancelEditContact() {
  console.log('cancelEditContact()');
  document.getElementById("edit-or-new-popup").classList.add("d-none");
  document.getElementById('edit-form').classList.add('d-none');
}


function addNewContact() {
  let firstName = document.getElementById("con-new-name").value.split(' ')[0];
  let lastName = document.getElementById("con-new-name").value.split(' ')[1];
  let phone = document.getElementById("con-new-phone").value;
  let mail = document.getElementById("con-new-mail").value;

  if (!firstName || !lastName || !phone || !mail) {
    return;
  }

  let firstCharOfName = firstName.charAt(0);
  console.log(`firstCharOfName: ${firstCharOfName}`);

  let element = [];
  for (let index = 0; index < contacts.length; index++) {
    element.push(contacts[index]["letter"]);
  }

  let contactListIndex = element.indexOf(firstCharOfName, 0);
  console.log(`contactListIndex: ${contactListIndex}`);

  document.getElementById('new-popup').style.visibility = 'hidden';
  document.getElementById('new-popup').classList.add('d-none');
  document.getElementById('new-popup-form').classList.add('d-none');

  console.log(`New contact, first name: ${firstName}`);
  console.log(`New contact, last name: ${lastName}`);
  console.log(`New contact, phone: ${phone}`);
  console.log(`New contact, mail: ${mail}`);

  // reset the input fields values
  document.getElementById("con-new-name").value = '';
  document.getElementById("con-new-phone").value = '';
  document.getElementById("con-new-mail").value = '';

  contacts[contactListIndex]['names'].push(firstName);
  contacts[contactListIndex]['lastNames'].push(lastName);
  contacts[contactListIndex]['phonenumbers'].push(phone);
  contacts[contactListIndex]['mail'].push(mail);

  console.log(`Contacts after adding of ${firstName} ${lastName}`);
  console.log(contacts);

  // sort contacts after adding new contact
  sortContatcs(contactListIndex);
  initContacts();
}

