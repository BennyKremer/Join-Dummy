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
  return `<div onclick="showPopup()" draggable="true" class="todo" ondragstart="startDragging(${element["id"]})" >
              <div class="section">${element["section"]}</div> 
              <br>
              <div class="title"><b>${element["title"]}</b></div>
              <div><div class="description">${element["description"]}</div>
 
     </div> `;
}

function showPopup(element) {
    return `<div id="popUp${element['id']}" class="popUp d-none">
    <div class="popipTodoInfo"> </div>
    </div> `;
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


