const highScoreList = document.getElementById("list");
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoreList.innerHTML = highScores
.map(score => {
    return `<li class="highScoreL">${score.name} - ${score.score}<li/>`;
}).join("");