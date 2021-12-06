const content = document.querySelector(".content");
const eContainer = document.querySelector(".error-container");
const eContainerMsg = document.querySelector(".error-container__message");
const inName = document.querySelector("#name");
const inDate = document.querySelector("#date");

document.getElementById("button--add").onclick = function() {
    var date = new Date(inDate.value);  
    var x = inName.value == null || inName.value == "";
    var y = date == "Invalid Date" || date == null || date == NaN;
    if (x || y) {
        eContainer.classList.remove("hidden");
        eContainerMsg.innerHTML = (x && y) ? "You must enter a name and deadline before creating a task." : 
        x ? "You must enter a name for your task." : "You must enter a deadline.";
    }
    else {
        var task = {name: inName.value, day: date.getDate().length === 1 ? "0" + date.getDate() : date.getDate(), month: (date.getMonth() + 1).length === 1 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1), year: date.getFullYear()};
        newTask(task);
    }
}

inName.oninput = function() {
    eContainer.classList.add("hidden");
}
inDate.oninput = function() {
    eContainer.classList.add("hidden");
}

function newTask(task) {
    var tContainer = document.querySelector("#template").cloneNode(true);
    tContainer.removeAttribute("id");
    tContainer.classList.remove("hidden");
    tContainer.querySelector(".task__name").innerHTML = task.name;
    tContainer.querySelector(".task__deadline").innerHTML = task.day + "." + task.month + "." + task.year + ".";
    content.appendChild(tContainer);
    inName.value = "";
    inDate.value = "";
}
function deleteTask(btnDelete) {
    var tContainer = btnDelete.parentNode.parentNode;
    tContainer.parentNode.removeChild(tContainer);    
}
function editTask(btnEdit) {
    btnEdit.setAttribute("onclick", "saveTask(this)");
    btnEdit.innerHTML = "SAVE";
    var tContainer = btnEdit.parentNode.parentNode;
    var currName = tContainer.querySelector(".task__name");
    var currDeadline = tContainer.querySelector(".task__deadline");
    var editInput = tContainer.querySelector(".task__name--edit");
    var editDeadline = tContainer.querySelector(".task__deadline--edit");
    currName.classList.add("hidden");
    currDeadline.classList.add("hidden");
    editInput.classList.remove("hidden");
    editDeadline.classList.remove("hidden");

    editInput.value = currName.innerHTML;
    var date = currDeadline.innerHTML;
    var day = date.substring(0, date.indexOf("."));
    //day = day.length === 1 ? "0" + day : day;
    date = date.substring(date.indexOf(".") + 1);
    var month = date.substring(0, date.indexOf("."));
    //month = month.length === 1 ? "0" + month : month;
    date = date.substring(date.indexOf(".") + 1);
    var year = date.substring(0, date.indexOf("."));
    editDeadline.value = year + "-" + month + "-" + day;
}
function saveTask(btnSave) {
    btnSave.setAttribute("onclick", "editTask(this)");
    btnSave.innerHTML = "EDIT";
    var tContainer = btnSave.parentNode.parentNode;
    var currName = tContainer.querySelector(".task__name");
    var currDeadline = tContainer.querySelector(".task__deadline");
    var editInput = tContainer.querySelector(".task__name--edit");
    var editDeadline = tContainer.querySelector(".task__deadline--edit");
    editInput.classList.add("hidden");
    editDeadline.classList.add("hidden");
    currName.classList.remove("hidden");
    currDeadline.classList.remove("hidden");

    var date = new Date(editDeadline.value);
    var newTask = {name: editInput.value, day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()};

    currName.innerHTML = newTask.name;
    currDeadline.innerHTML = newTask.day + "." + newTask.month + "." + newTask.year + ".";
}

// NAPRAVI FUNKCIJE ZA getDay, getMonth, getYear...
