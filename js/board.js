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

let currentDraggedElement;


function updateHTML() {
  //Erster Todo Abschnitt
  let todo = todos.filter((t) => t["category"] == "Todo");

  document.getElementById("todo").innerHTML = "";

  for (let index = 0; index < todo.length; index++) {
    const element = todo[index];

    document.getElementById("todo").innerHTML += generateTodoHTML(element);
  }

  //Zweiter Todo Abschnitt
  let inProgress = todos.filter((t) => t["category"] == "In progress");

  document.getElementById("inProgress").innerHTML = "";

  for (let index = 0; index < inProgress.length; index++) {
    const element = inProgress[index];
    document.getElementById("inProgress").innerHTML +=
      generateTodoHTML(element);
  }

  //Dritter Todo Abschnitt
  let awaitFeedback = todos.filter((t) => t["category"] == "Await feedback");

  document.getElementById("awaitFeedback").innerHTML = "";

  for (let index = 0; index < awaitFeedback.length; index++) {
    const element = awaitFeedback[index];
    document.getElementById("awaitFeedback").innerHTML +=
      generateTodoHTML(element);
  }

  //Vierter Todo Abschnitt
  let done = todos.filter((t) => t["category"] == "Done");

  document.getElementById("done").innerHTML = "";

  for (let index = 0; index < done.length; index++) {
    const element = done[index];
    document.getElementById("done").innerHTML += generateTodoHTML(element);
  }
}

function startDragging(id) { //lässt Tasks nehmen
  currentDraggedElement = id;
}

function generateTodoHTML(element) {  //Drag & Drop Element
  return `<div onclick="showPopup(${element['id']})" draggable="true" class="todo" ondragstart="startDragging(${element["id"]})" >
              <div class="section">${element["section"]}</div> 
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

function addTaskBtn(i) {  //Zeigt den Sidepopup an
  document.getElementById('sidePopUp').classList.add('d-none');
  document.getElementById('sidePopUpInfo').innerHTML = sidePopUpInfo(i);
}

function sidePopUpInfo(i) { //Sidepopup Container
  document.getElementById('addBtn').innerHTML += `
  <div class="sidePopupFull">
  <h1>Test</h1>
  </div>
  `
}

function addTaskBtn(i) {
  document.getElementById('sidePopUp').innerHTML += `
  <div class="sidePopupFull">
  <h1>Test</h1>
  </div>
  `
}


function popUpInfo(i){ //Hauptpopup Container
    return `
    <div class="popUpFull" id="popUpFull">
        <h1>${todos[i]['section']}</h1>
            <div class="titlePopup">${todos[i]['title']}</div>
                <div class="descriptionPopup">${todos[i]['description']}</div>
                    <button onclick="closeTodo('popUp${todos['id']}', event)" class="closeBtn">
                        <img src="./assets/img/closeBtn.png">
                    </button>
                    <button onclick="editTask" class="editTask">
                        <img src="./assets/img/pencilEdit.png">
                    </button>
    </div>

    `

}

function editTask() { //edit Button

}

function closeTodo(i) {
  getElementById('popUpFull').classList.remove('d-none');
  generateTodoHTML(i);
}



function allowDrop(ev) { // lässt Task im neuen Feld
  ev.preventDefault();
}

function moveTo(category) { //Draggable Area
  todos[currentDraggedElement]["category"] = category;
  updateHTML();
}

function openTodoInfo(id) {  //öffnet Popup
    document.getElementById(id).classList.remove('d-none');
}

function closeTodoInfo(id, event) { //schließt Popup
    document.getElementById(id).classList.add('d-none');
    event.stopPropagation();
}


