var game = document.getElementById('game');
//game.style.display = "none";
var choices = Array.from(document.getElementsByClassName('choice-text'));
//console.log(choices)
var question = document.getElementById("question");
var questionCounterText = document.getElementById("questionCounterText");
var scoreText = document.getElementById("score");
var progressBarFull = document.getElementById("progressBar-Full"); 
var game = document.getElementById("game");
var loader1 = document.getElementById("loader1");
var loader2 = document.getElementById("loader2");

/*let questions =[
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];
*/
let questions = [];

/*fetch('./question.json')
.then((res) => {
    return res.json();
})
.then((LoadedQuestions) => {
    questions = LoadedQuestions;
    startgame();
})
.catch((err) => {
    console.log(err);
});*/

//splice -> array.splice(element_position_to_add, num_of_element_to_be_removed, item1, item2, ..... itemX)

fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
.then((res) => {
    return res.json();
})
.then((LoadedQuestions) => {
    questions = LoadedQuestions.results.map((LoadedQuestion) => {
        const formattedQuestion = {
            question: LoadedQuestion.question,
        };

        const answerChoices = [...LoadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
        answerChoices.splice(formattedQuestion.answer - 1, 0, LoadedQuestion.correct_answer);
        
        answerChoices.forEach((choice, index) => {
            formattedQuestion['choice' + (index+1)] = choice;
        });
        return formattedQuestion;
    });
    startgame();
})
.catch((err) => {
    console.log(err);
});

let questionCounter = 0;
let score = 0;
let availableQuestions = [];
let currentQuestion = {};
let acceptingAnswers = false;

const CORRECT_ANS = 10;
const MAX_QUESTION = 3;

startgame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    //console.log(availableQuestions);
    getNewQuestion();
    game.classList.remove("hidden");
    loader1.classList.add("hidden");
    loader2.classList.add("hidden");
};

getNewQuestion = () => {
    localStorage.setItem('RecentScore', score);
    if (availableQuestions === 0 || questionCounter >= MAX_QUESTION){
        return window.location.assign('./end.html');
    }


    questionCounter++;
    questionCounterText.innerText = ` QUESTION: ${questionCounter}/${MAX_QUESTION}`;

    progressBarFull.style.width = `${(questionCounter/MAX_QUESTION)*100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        console.log(selectedChoice, selectedAnswer);
        //console.log(selectedAnswer == currentQuestion.answer);
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        //console.log(classToApply);

        if(classToApply == "correct"){
            add_score(CORRECT_ANS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();    
        },1000);
    });
});

add_score = num => {
    score += num;
    scoreText.innerText = score;
};

//startgame();