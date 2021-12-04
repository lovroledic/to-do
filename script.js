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
        var task = {name: inName.value, day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()};
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
    tContainer.querySelector(".task__name").innerHTML = task.name;
    tContainer.querySelector(".task__deadline").innerHTML = task.day + "." + task.month + "." + task.year + ".";
    content.appendChild(tContainer);
}
