function generate(){
    var quotes = {
        "Winston Churchill":'“The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty."',
        "Will Rogers":'“Don’t let yesterday take up too much of today.”'
    }
    var authors = Object.keys(quotes);
    var author = authors[Math.floor(Math.random() * authors.length)];
    var quote = quotes[author];
    document.getElementById("quote").innerHTML = quote;
    document.getElementById("author").innerHTML = author;
}