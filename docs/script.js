const addButton = document.getElementById("add");
const input = document.getElementById("input");
const tasksDiv = document.querySelector(".tasks");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

// Add Task
addButton.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    console.log(input.value);
    input.value = ""; // Empty Input Field
  }
};

// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentElement.remove();
  }
  // Task Element
  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
});

// addTaskToArray
function addTaskToArray(value){
    const task = {
        id:Date.now(),
        title:value,
        completed:false
    }
    arrayOfTasks.push(task);
    addElementsToPage(arrayOfTasks);
    addTasksToLocalStorage(arrayOfTasks);
}

// addElementsToPage
function addElementsToPage(arrayOfTasks){
    tasksDiv.innerHTML = ""
    arrayOfTasks.forEach(element => {
        let div = document.createElement("div");
        div.className = "task flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm transition hover:bg-gray-200 cursor-pointer mb-2";
        if(element.completed){
            div.className += "done line-through text-gray-400 bg-gray-200";
        }
        div.setAttribute("data-id" , element.id);
        div.appendChild(document.createTextNode(element.title));
        // Create Delete Button
        let span = document.createElement("span");
        span.className = "del bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm";
        span.appendChild(document.createTextNode("Delete"));
        // Append Button To Main Div
        div.appendChild(span);
        // Add Task Div To Tasks Container
        tasksDiv.appendChild(div);
    });
}

// addTasksToLocalStorage
function addTasksToLocalStorage(arrayOfTasks){
      window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

// getDataFromLocalStorage
function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if (data) {
    let tasks = JSON.parse(data);
    addElementsToPage(tasks);
    }
}

// deleteTaskWithSpecificId
function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addTasksToLocalStorage(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
    }
  }
  addTasksToLocalStorage(arrayOfTasks);
}