let contacts = [{
    "name": "Max",
    "email": "max@max.de",
    "phone": "01762232232"
},

{
    "name": "Adele",
    "email": "adele@mail.de",
    "phone": "2"
},

{
    "name": "Fritz",
    "email": "fritz@email.de",
    "phone": "3"
},
]

function showContacts() {
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        document.getElementById('contactLeft').innerHTML += /*html*/`
            <div class="contactBox">
                <span>${contact['name']}</span>
                <span>${contact['email']}</span>
                <span>${contact['phone']}</span>
            </div>    
        `;
    }
}

function addContact() {
    let name = document.getElementById('contactName');
    let email = document.getElementById('contactEmail');
    let phone = document.getElementById('contactPhone');

    let newContact =
    {
        "name": name.value,
        "email": email.value,
        "phone": phone.value
    };

    contacts.push(newContact);

    name.value = '';
    email.value = '';
    phone.value = '';

}

function contactFormular() {
    document.getElementById('contactLeft').innerHTML += /*html*/`
        
        <div class="newContactContainer">
            <div class="contactHeader">

            </div>
        
        
            <form onsubmit="addContact()" class="contactForm">
                <input type="text" placeholder="Name" id="contactName">
                <input type="text" placeholder="Email" id="contactEmail">
                <input type="text" placeholder="Phone" id="contactPhone">
                <button>Cancel</button>
                <button>Create contact</button>
            </form>
        </div>
`;
}
