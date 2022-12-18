setURL("https://gruppe-373.developerakademie.net/smallest_backend_ever");

// Define variablees
let clearBtn = document.getElementById("clear_btn");
let createBtn = document.getElementById("create_btn");

let enterTitle = document.getElementById("enter_title");
let assign = document.getElementById("assign");
let dueDate = document.getElementById("due_date");
let category = document.getElementById("category");
let description = document.getElementById("description");
let select = document.getElementById("select");
let subtask = document.getElementById("subtask");

let tasks = [];


/**
 * 
 */
function render() {
  loadArrayFromBackend();
  clearFields();
}

/**
 * function resetDataType (at work > not working properly)
 * @param {*} element
 */
function resetDataType(element) {
  let typeofElement = typeof element;
  switch (typeofElement) {
    case "string":
      element = "";
      console.log(`Type of ${element}: ${typeofElement}`);
      break;
    case "number":
      element = 0;
      console.log(`Type of ${element}: ${typeofElement}`);
      break;
    case "boolean":
      element = true;
      console.log(`Type of ${element}: ${typeofElement}`);
      break;
    default:
      console.log(`Type of ${element}: ${typeofElement}`);
      console.log("Error: Unknown");
  }
}


//#region prioBtn
let btnPrioUrgent = false;
let btnPrioMedium = false;
let btnPrioLow = false;

function defaultBtnPrioUrgent() {
  document.getElementById("prio_Urgent").style.backgroundColor = "white";
  document.getElementById("prio_Urgent").style.color = "black";
  document.getElementById("icon_prioUrgent_red").style.backgroundColor = "var(--btn_prio_red)";
  btnPrioUrgent = false;
}

function defaultBtnPrioMedium() {
  document.getElementById("prio_Medium").style.backgroundColor = "white";
  document.getElementById("prio_Medium").style.color = "black";
  document.getElementById("icon_prioMedium_orange").style.backgroundColor = "var(--btn_prio_orange)";
  btnPrioMedium = false;
}

function defaultBtnPrioLow() {
  document.getElementById("prio_Low").style.backgroundColor = "white";
  document.getElementById("prio_Low").style.color = "black";
  document.getElementById("icon_prioLow_green").style.backgroundColor = "var(--btn_prio_green)";
  btnPrioLow = false;
}

function setPrioUrgent() {
  if (btnPrioUrgent) {
    defaultBtnPrioUrgent();
  } else {
    document.getElementById("prio_Urgent").style.backgroundColor = "var(--btn_prio_red)";
    document.getElementById("prio_Urgent").style.color = "white";
    document.getElementById("icon_prioUrgent_red").style.backgroundColor = "white";
    btnPrioUrgent = true;
  }
  defaultBtnPrioMedium();
  defaultBtnPrioLow();
}

function setPrioMedium() {
  if (btnPrioMedium) {
    defaultBtnPrioMedium();
  } else {
    document.getElementById("prio_Medium").style.backgroundColor = "var(--btn_prio_orange)";
    document.getElementById("prio_Medium").style.color = "white";
    document.getElementById("icon_prioMedium_orange").style.backgroundColor = "white";
    btnPrioMedium = true;
  }
  defaultBtnPrioUrgent();
  defaultBtnPrioLow();
}

function setPrioLow() {
  if (btnPrioLow) {
    defaultBtnPrioLow();
  } else {
    document.getElementById("prio_Low").style.backgroundColor = "var(--btn_prio_green)";
    document.getElementById("prio_Low").style.color = "white";
    document.getElementById("icon_prioLow_green").style.backgroundColor = "white";
    btnPrioLow = true;
  }
  defaultBtnPrioUrgent();
  defaultBtnPrioMedium();
}
//#endregion prioBtn


//#region taskButtons
function clearFormFields() {
  let enterTitle = document.getElementById("enter_title");
  let assign = document.getElementById("assign");
  let dueDate = document.getElementById("due_date");
  let description = document.getElementById("description");
  let subtask = document.getElementById("subtask");

  enterTitle.value = "";
  assign.selectedIndex = 0;
  dueDate.value = "";
  description.value = "";
  subtask.value = "";
}
//#endregion taskButtons


//#region backendIntegration

function loadArrayFromBackend() {
  tasks = getArrayFromBackend('tasks');
}

async function backendServerStorage() {
  createTasks();
  setArrayToBackend("tasks",tasks);
  clearFields();
}

function setPrioStatus(){
  let status = '';
  if (btnPrioUrgent) status = "urgent";
  if (btnPrioMedium) status = "medium";
  if (btnPrioLow) status = "low";
  return status;
}

function createTasks() {
  let prioStat = setPrioStatus();

  let task = {
    title: enterTitle.value,
    assign: assign.value,
    date: dueDate.value,
    category: category.value,
    prio: prioStat,
    description: description.value,
    subtask: subtask.value,
    board_category: "todo",
    id: new Date().getTime()
  };

  tasks.push(task);
  console.log(tasks);
}

function clearFields() {
  enterTitle.value = "";
  assign.selectedIndex = 0;
  dueDate.value = "";
  category.selectedIndex = 0;
  description.value = "";
  subtask.value = "";
}

/**
 * OnClick function for the button "Add task" in board.html
 */
 function createTaskForBoard() {
  backendServerStorage();
  document.getElementById('message').classList.remove('d_none');
  setTimeout(() => {
    window.location.href = 'board.html';
  }, 1500);
}

/**
 * OnClick function for the button "Create Task" in addTask.html
 */
async function createTaskForHtml() {
  backendServerStorage();
}
//#endregion backendIntegration


//#region DateFormat
$("input").on("change", function() {
  this.setAttribute(
      "data-date",
      moment(this.value, "YYYY-MM-DD")
      .format( this.getAttribute("data-date-format") )
  )
}).trigger("change")


// function changeDateFormat() {
//   dateFormat = document.getElementById('due_date');
//   dateFormat.setAttribute("data-date-format", 
//     moment(dateFormat.value, "YYYY-MM-DD")
//     .format(dateFormat.getAttribute("data-date-format" ))
//   );
// }
//#endregion DateFormat
