if (typeof(Storage) !== undefined) {
    window.onload = function() {
        var keys = Object.keys(localStorage),
            i = keys.length
        while (i--) {
            newTask(JSON.parse(localStorage.getItem(keys[i])))
        }
        //localStorage.clear();
    }
}

const content = document.querySelector(".content")
const eContainer = document.querySelector(".error-container")
const eContainerMsg = document.querySelector(".error-container__message")
const inName = document.querySelector("#name")
const inDate = document.querySelector("#date")

document.querySelector("#button--add").onclick = function() {
    var date = new Date(inDate.value)
    var x = inName.value == null || inName.value == "";
    var y = date == "Invalid Date" || date == null || date == NaN;
    if (x || y) {
        eContainer.classList.remove("hidden");
        eContainerMsg.innerHTML = (x && y) ? "You must enter a name and deadline before creating a task." : 
        x ? "You must enter a name for your task." : "You must enter a deadline.";
    }
    else {
        var task = {
            year: getYear(date),
            month: getMonth(date),
            day: getDay(date),
            name: inName.value,
            checked: false
        }
        if (localStorage.getItem(JSON.stringify(task)) === null) { 
            localStorage.setItem(JSON.stringify(task), JSON.stringify(task))
            newTask(task)
        } else {
            alert("Task already exists.")
        }
    }
}

inName.oninput = function() {
    eContainer.classList.add("hidden");
}
inDate.oninput = function() {
    eContainer.classList.add("hidden");
}

function newTask(task) {
    var tContainer = document.querySelector("#template").cloneNode(true)
    tContainer.removeAttribute("id")
    tContainer.id = JSON.stringify(task)
    tContainer.classList.remove("hidden")
    tContainer.querySelector(".task__name").innerHTML = task.name
    tContainer.querySelector(".task__deadline").innerHTML = task.day + "." + task.month + "." + task.year + "."
    tContainer.querySelector(".task-button--check").checked = task.checked
    content.insertBefore(tContainer, content.firstChild)
    inName.value = ""
    inDate.value = ""
}
function deleteTask(btnDelete) {
    var tContainer = btnDelete.parentNode.parentNode
    localStorage.removeItem(tContainer.id)
    tContainer.parentNode.removeChild(tContainer)
}
function editTask(btnEdit) {
    btnEdit.setAttribute("onclick", "saveTask(this)")
    btnEdit.innerHTML = "SAVE"
    var tContainer = btnEdit.parentNode.parentNode
    var currName = tContainer.querySelector(".task__name")
    var currDeadline = tContainer.querySelector(".task__deadline")
    var editInput = tContainer.querySelector(".task__name--edit")
    var editDeadline = tContainer.querySelector(".task__deadline--edit")
    currName.classList.add("hidden")
    currDeadline.classList.add("hidden")
    editInput.classList.remove("hidden")
    editDeadline.classList.remove("hidden")

    editInput.value = currName.innerHTML
    var date = currDeadline.innerHTML
    var day = date.substring(0, date.indexOf("."))
    date = date.substring(date.indexOf(".") + 1)
    var month = date.substring(0, date.indexOf("."))
    date = date.substring(date.indexOf(".") + 1)
    var year = date.substring(0, date.indexOf("."))
    editDeadline.value = year + "-" + month + "-" + day
}
function saveTask(btnSave) {
    var tContainer = btnSave.parentNode.parentNode
    var currName = tContainer.querySelector(".task__name")
    var currDeadline = tContainer.querySelector(".task__deadline")
    var checkbox = tContainer.querySelector(".task-button--check")
    var editInput = tContainer.querySelector(".task__name--edit")
    var editDeadline = tContainer.querySelector(".task__deadline--edit")

    var date = new Date(editDeadline.value)
    var newTask = {
        year: getYear(date),
        month: getMonth(date),
        day: getDay(date),
        name: editInput.value,
        checked: checkbox.checked
    }

    localStorage.removeItem(tContainer.id)
    tContainer.id = JSON.stringify(newTask)
    btnSave.setAttribute("onclick", "editTask(this)")
    btnSave.innerHTML = "EDIT"
    
    editInput.classList.add("hidden")
    editDeadline.classList.add("hidden")
    currName.classList.remove("hidden")
    currDeadline.classList.remove("hidden")
    
    currName.innerHTML = newTask.name
    currDeadline.innerHTML = newTask.day + "." + newTask.month + "." + newTask.year + "."
    localStorage.setItem(tContainer.id, tContainer.id)
    
}
function checkTask(btnCheck) {
    var tContainer = btnCheck.parentNode.parentNode
    localStorage.removeItem(tContainer.id)
    var task = JSON.parse(tContainer.id)
    task.checked = !task.checked
    tContainer.querySelector(".task-button--check").checked = task.checked
    tContainer.id = JSON.stringify(task)
    localStorage.setItem(tContainer.id, tContainer.id)
}

function getDay(date) {
    return date.getDate().toString().length == 1 ? "0" + date.getDate() : date.getDate()
}
function getMonth(date) {
    var month = date.getMonth() + 1
    return month.toString().length == 1 ? "0" + month : month
}
function getYear(date) {
    return date.getFullYear()
}
