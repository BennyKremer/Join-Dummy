/**********************************************************
 * <body onload="init()">
//*********************************************************/

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

// setURL('https://gruppe-373.developerakademie.com/smallest_backend_ever');
async function init() {
  await includeHTML();
  await downloadFromServer();
  // render();
  // getCurrentYear();
}

let date = new Date();

function getCurrentYear() {
  document.getElementById("copyDate").innerHTML = ` ${date.getFullYear()} `;
}
