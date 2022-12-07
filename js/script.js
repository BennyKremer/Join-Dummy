/**********************************************************
 * <body onload="init()">
//*********************************************************/
/**
 *
 */
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

/**
 *
 */
async function init() {
  await includeHTML();
  await downloadFromServer();
  render();
  // getCurrentYear();
}

/**
 * LENGTH leading zeros will get added to the string
 * LENGTH = targetLength - num.toString().length
 * @param {number} num - targetnumber
 * @param {number} targetLength - length of targetnumber
 * @returns 
 */
function padWithZero(num, targetLength) {
  return String(num).padStart(targetLength, "0");
}
/**
 *
 * @returns
 */
function today() {
  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let today = padWithZero(year, 2) + "-" + padWithZero(month, 2) + "-" + padWithZero(day, 2);
  // return `${year}-${month}-${day}`
  return today;
}

/**
 *  (AT WORK)
 * NOTE: At the last day of the month THIS SHOULD NOT BE USED (incorrect return is possible)
 * @param {number} Day
 * @param {number} Month
 * @param {number} Year
 * @param {number} Hours
 * @param {number} Minutes
 * @param {number} Seconds
 * @returns
 */
function nowTimestampPlus(Day, Month, Year, Hours, Minutes, Seconds) {
  let date = new Date();
  let sec = date.getSeconds();
  let min = date.getMinutes();
  let hour = date.getHours();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();


  sec += Seconds;
  min += Minutes;
  if (sec > 59) {
    min += 1;
    sec -= 60;
  }
  hour = date.getHours() + Hours;
  if (min > 59) {
    hour += 1;
    min -= 60;
  }

  // max 31 days of month: 01,03,05,07,08,10,12: FINISHED
  // max 30 days of month: 04,06,09,11: not FINISHED
  // max 28/29 days of month: 02: not FINISHED
  day += Day;
  // if-clause hour: not ready
  if (hour > 23) {
    day += 1;
    hour -= 24;
  }
  month += Month;
  // if-clause day: not ready
  if (day > 31) {
    month += 1;
    day -= 31;
  }
  // if (day > 30) {
  //   month += 1;
  //   day -= 30;
  // }
  // if (day > 29) {
  //   month += 1;
  //   day -= 29;
  // }
  // if (day > 28) {
  //   month += 1;
  //   day -= 28;
  // }

  year += Year;
  if (month > 12) {
    year += 1;
    month -= 12;
  }

  let timeStamp =
    padWithZero(year, 4) + "-" + padWithZero(month, 2) + "-" + padWithZero(day, 2)
    + " " + 
    padWithZero(hour, 2) + ":" + padWithZero(min, 2) + ":" + padWithZero(sec, 2);
  return timeStamp;
}

/**
 *
 * @returns
 */
function nowTimestamp() {
  return nowTimestampPlus(0, 0, 0, 0, 0, 0);
}

/**
 *
 */
function getCurrentYear() {
  let date = new Date();
  document.getElementById("copyDate").innerHTML = ` ${date.getFullYear()} `;
}

/**
 *
 */
function getUploadDate() {
  let netSeverDate = "";
  let localServerDate = "";
  let uploadTimestamp = "";

  if (window.location.hostname != "127.0.0.1") {
    netSeverDate = nowTimestamp();
  }

  if (window.location.hostname == "127.0.0.1") {
    localServerDate = nowTimestampPlus(0, 0, 0, 0, 5, 0);
  }

  if (netSeverDate < localServerDate) uploadTimestamp = netSeverDate;

  document.getElementById("copyDate").innerHTML = ` ${uploadTimestamp} `;
}

/**
 *
 * @param {*} id
 * @param {*} classElement
 */
function addClasslist(id, classElement) {
  document.getElementById(id).classList.add(classElement);
}

/**
 *
 * @param {*} id
 * @param {*} classElement
 */
function removeClasslist(id, classElement) {
  document.getElementById(id).classList.remove(classElement);
}

/**
 * save Array To Backend
 * @param {string} key
 * @param {array} array
 */
async function setArrayToBackend(key, array) {
  await backend.setItem(key, JSON.stringify(array));
}

/**
 * load Array From Backend or a empty Array
 * @param {string} key
 * @returns
 */
function getArrayFromBackend(key) {
  return JSON.parse(backend.getItem(key)) || [];
}
