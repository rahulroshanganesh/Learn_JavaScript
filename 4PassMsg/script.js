const messageinput = document.getElementById("messageinput");

messageinput.addEventListener("keydown",function(event){
    if(event.key == "Enter")
        passmessage();
})

function passmessage(){
    document.getElementById("resultmsgdisp").innerHTML = messageinput.value;
    messageinput.value = "";
}