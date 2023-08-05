function changeColor(){
    var hex_numbers=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];

    var hexcode = '';
    /*Generating random number from 0 to 15 */
    /*runs 5times*/
    for(var i = 0 ;i<6; i++){
        var random_index  = Math.floor(Math.random() * hex_numbers.length);

        /*concatenation of  hexcode*/
        hexcode += hex_numbers[random_index];
    }
    document.getElementById("hex-code").innerHTML = hexcode;
    document.getElementsByTagName("body")[0].style.background= "#"+hexcode;
}