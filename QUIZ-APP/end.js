const finalScore = document.getElementById("finalScore");
const saveBtn = document.getElementById("saveButton");
const username = document.getElementById("username");
const recentScore = localStorage.getItem('RecentScore');
finalScore.innerText = `SCORE: ${recentScore}`;

const highScores = JSON.parse(localStorage.getItem('highScores')) || []


username.addEventListener("keyup", () => {
    saveBtn.disabled = !username.value;
});

//localstorage can store every thing as string so JSON.stringify cause int to string then JSON.parse cause string to int
saveScore = (e) => {
    //console.log("save btn clicked");
    e.preventDefault();
    const score = {
        score: recentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a,b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    
    //console.log(highScores);
    window.location.assign('./index.html');
};