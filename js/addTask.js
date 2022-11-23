setURL("https://gruppe-373.developerakademie.net/smallest_backend_ever");

// Define variablees
let clearBtn = document.getElementById("clear_btn");
let createBtn = document.getElementById("create_btn");

let enterTitle = document.getElementById("enter_title");
let assign = document.getElementById("assign");
let dueDate = document.getElementById("due_date");
let description = document.getElementById("description");
let select = document.getElementById("select");
let subtask = document.getElementById("subtask");

let tasks = [];

function render() {
  loadArrayFromBackend();
}

function loadArrayFromBackend() {
  // tasks = getArrayFromBackend('tasks');
  tasks = JSON.parse(backend.getItem('tasks')) || [];
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
/*=======================
// Priority Buttons
//=======================*/
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

/*=======================
// Task Buttons
//=======================*/
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

/*=======================
// Backend Integration
//=======================*/
//#region backendIntegration


async function backendServerStorage() {
  createTasks();
  // setArrayToBackend("tasks",tasks);
  let tasksAsString = JSON.stringify(tasks);
  await backend.setItem("tasks", tasksAsString);
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
  let enterTitle = document.getElementById("enter_title").value;
  let assign = document.getElementById("assign").value;
  let dueDate = document.getElementById("due_date").value;
  let category = document.getElementById("category").value;
  let description = document.getElementById("description").value;
  let subtask = document.getElementById("subtask").value;
  let prioStat = setPrioStatus();

  let task = {
    title: enterTitle,
    assign: assign,
    date: dueDate,
    category: category,
    prio: prioStat,
    description: description,
    subtask: subtask,
    board_category: "todo",
  };

  tasks.push(task);
}

function clearFields() {
  let enterTitle = document.getElementById("enter_title");
  let assign = document.getElementById("assign");
  let dueDate = document.getElementById("due_date");
  let description = document.getElementById("description");
  let subtask = document.getElementById("subtask");

  enterTitle.value = "";
  assign.selectedIndex = 0;
  dueDate.value = "";
  description.value = "";
  subtask.selectedIndex = 0;
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

/*=======================
// Responsiveness
//=======================*/
//#region Responsiveness

//#endregion Responsiveness
