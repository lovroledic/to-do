const inName = document.querySelector("#name");
const inDate = document.querySelector("#date");

document.getElementById("button--add").onclick = function() {
    var name = inName.value;
    var date = new Date(inDate.value);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getYear();
    //alert(name + " " + day + "." + month + "." + year + ".");
    alert(date.getYear())
}