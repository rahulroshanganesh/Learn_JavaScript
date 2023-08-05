var colors = []
var index = 0

for(i=0;i<5;i++){
    var input_color = prompt("Enter upto 5 color name [Eg: Red]: ");
    colors.push(input_color)
}

document.querySelector("#submit").addEventListener('click', ()=>{
    if(index > (colors.length-1))
        index = 0;
        
    document.body.style.backgroundColor = colors[index++];
})