let todos = [
  {
    id: 0,
    section: "Design",
    title: "Website redesign",
    category: "Todo",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
  },
  {
    id: 1,
    section: "Sales",
    title: "Call potentical clients",
    category: "In progress",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
  },
  {
    id: 2,
    section: "Backoffice",
    title: "Accounting invoices",
    category: "Await feedback",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
  },
  {
    id: 3,
    section: "Marketing",
    title: "Social media strategy",
    category: "Done",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
  },
  {
    id: 3,
    section: "Design",
    title: "Add Button for something",
    category: "Done",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
  }
];

setURL("https://gruppe-373.developerakademie.net/smallest_backend_ever");

async function render(){

  loadArrayFromBackend();
  updateHTML();
}

let currentDraggedElement;


function updateHTML() {
  //Erster Todo Abschnitt
  let todo = todos.filter((t) => t["board_category"] == "todo");

  document.getElementById("todo").innerHTML = "";

  for (let index = 0; index < todo.length; index++) {
    const element = todo[index];

    document.getElementById("todo").innerHTML += generateTodoHTML(index, element);
  }

  //Zweiter Todo Abschnitt
  let inProgress = todos.filter((t) => t["board_category"] == "progress");

  document.getElementById("inProgress").innerHTML = "";

  for (let index = 0; index < inProgress.length; index++) {
    const element = inProgress[index];
    document.getElementById("inProgress").innerHTML +=
      generateTodoHTML(index, element);
  }

  //Dritter Todo Abschnitt
  let awaitFeedback = todos.filter((t) => t["board_category"] == "feedback");

  document.getElementById("awaitFeedback").innerHTML = "";

  for (let index = 0; index < awaitFeedback.length; index++) {
    const element = awaitFeedback[index];
    document.getElementById("awaitFeedback").innerHTML +=
      generateTodoHTML(index, element);
  }

  //Vierter Todo Abschnitt
  let done = todos.filter((t) => t["board_category"] == "done");

  document.getElementById("done").innerHTML = "";

  for (let index = 0; index < done.length; index++) {
    const element = done[index];
    document.getElementById("done").innerHTML += generateTodoHTML(index, element);
  }
}

/**
 * This function is used to let taking the Elements for the Drag & Drop Section
 * @param {string} id - This is the clicked Drag Element
 */
function startDragging(id) { //l??sst Tasks nehmen
  currentDraggedElement = id;
}

function generateTodoHTML(index, element) {  //Drag & Drop Element
  return `<div onclick="showPopup(${index})" draggable="true" class="todo" ondragstart="startDragging(${index})" >
              <div class="section">${element["category"]}</div> 
              <br>
              <div class="title"><b>${element["title"]}</b></div>
              <div><div class="description">${element["description"]}</div>
 
     </div> `;
}

function loadArrayFromBackend() { //holt die Tasks vom Backend
    todos = JSON.parse(backend.getItem('tasks')) || [];
}

function showPopup(i) {   //Zeigt den Board- Hauptpopup an
  document.getElementById('popUp').classList.remove('d-none');
  document.getElementById('popUpInfo').innerHTML = popUpInfo(i);
}

// function addTaskBtn(i) {  //Zeigt den taskPopUp an
// >>>>>>>>>>>>> DOPPELTE function >>>>>>>>>>>>>>>>>>>>>> L??SCHEN
//   document.getElementById('taskPopUp').classList.add('d-none');
//   document.getElementById('taskPopUpInfo').innerHTML = taskPopUpInfo(i);
// }


// EXPORT in "task.js" ------------------------------------------
// function addTaskBtn(i) {
//   document.getElementById('taskPopUp').classList.remove('d-none');
  
// }

// function closeSideTask() {
//   document.getElementById('taskPopUp').classList.add('d-none');
// }
//--------------------------------------------------------------

function popUpInfo(i){ //Hauptpopup Container
  return `
  <div class="popUpFull" id="popUpFull">
    <h1>${todos[i]['section']}</h1>
          <div class="titlePopup">${todos[i]['title']}</div>
          <div class="descriptionPopup">${todos[i]['description']}</div>
          <div class="dueDatePopup"><b>Due date:&nbsp;</b>${todos[i]['date']}</div>
          <div class="priorityPopup"><b>Priority:&nbsp;</b>${todos[i]['prio']}</div>
          <div class="assignPopup"><b>Assigned To:&nbsp;</b><br>${todos[i]['assign']}</div>
            <button onclick="closeTodo('popUp${todos['id']}', event)" class="closeBtn">
              <img src="./assets/img/closeBtn.png">
            </button>
            <button onclick="editTask()" class="editTask">
              <img src="./assets/img/pencilEdit.png">
            </button>
</div>       
`;      
}

// ----------------------------------------------------------------
// WIRD NICHT BENUTZT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> L??SCHEN
// function taskPopUpInfo(i) {  //taskPopUp Container
//   return `
//   <div class="taskPopUpTitle">${todos[i]['description']}</div>
//   `;
// }
//  function showtaskPopUp(i){ //zeigt taskPopUp an

function editTask() { //edit Button
  document.getElementById('popUpFull').innerHTML += /*html*/ ` 
    <h3>test</h3>
  `;
}
//  }
// ----------------------------------------------------------------

function editTask() { //edit Button     editTask => editTodo
  document.getElementById('')
}

function closeTodo() {
  document.getElementById('popUp').classList.add('d-none');
}



function allowDrop(ev) { // l??sst Task im neuen Feld
  ev.preventDefault();
}

function moveTo(category) { //Draggable Area
  todos[currentDraggedElement]["board_category"] = category;
  let categoryTodo = todos.filter((t) => t["board_category"] == "feedback")
  categoryTodo[currentDraggedElement]["board_category"] = category;
  updateHTML();
}

function openTodoInfo(id) {  //??ffnet Popup
    document.getElementById(id).classList.remove('d-none');
}

function closeTodoInfo(id, event) { //schlie??t Popup
    document.getElementById(id).classList.add('d-none');
    event.stopPropagation();
}

async function backendStorageTodos() { //speichert Tasks im Backend
  
}



