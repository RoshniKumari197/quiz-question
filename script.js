// const { createElement } = require("react");

const startscreen = document.getElementById("start-screen");
const questionscreen = document.getElementById("question-screen");
const resultscreen = document.getElementById("result-screen");
const startbtn = document.getElementById("start-btn");
const question = document.getElementById("questions");
const questionspan = document.getElementById("question-no");
const totalquestionspan = document.getElementById("total-question");
const scorespan = document.getElementById("score");
const progress = document.getElementById("progress");
const finalscore = document.getElementById("final-score");
const totalscore = document.getElementById("max-score");
const answercontainer = document.getElementById("answer-container");
const messege = document.getElementById("messege");
const resultbtn = document.getElementById("result-btn");


const quizQuestion = [
    {
      question: "What is the largest continent in the world?",
      answers: [
        {text: "Africa", correct: false},
        {text: "Asia", correct: true},
        {text: "North America", correct: false},
        {text: "Antartica", correct: false},
      ],
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: [
        {text: "Earth", correct: false},
        {text: "Mars", correct: true},
        {text: "Jupiter", correct: false},
        {text: "Venus", correct: false},
      ],
    },
    {
      question: "What is the hardest natural substance on Earth?",
      answers: [
        {text: "Gold", correct: false},
        {text: "Iron", correct: false},
        {text: "Platinum", correct: false},
        {text: "Diamond", correct: true},
      ],
    },
    {
      question: "Who was the first Prime Minister of Bharat?",
      answers: [
        {text: "Dr. Ranjendra Prasad", correct: false},
        {text: "Mahatma Gandhi", correct: false},
        {text: "Jawaharlal Nehru", correct: true},
        {text: "Antartica", correct: false},
      ],
    },
    {
      question: "What is the capital of France?",
      answers: [
        {text: "Paris", correct: true},
        {text: "Rome", correct: false},
        {text: "London", correct: false},
        {text: "Berlin", correct: false},
      ],
    },
]

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false

totalquestionspan.textContent = quizQuestion.length;
totalscore.textContent = quizQuestion.length

startbtn.addEventListener("click", startQuiz);
resultbtn.addEventListener("click", restartQuiz);

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    scorespan.textContent = 0;
    
    startscreen.classList.remove("active")
    questionscreen.classList.add("active")

    showQuestion()
}

function showQuestion() {
    answersDisabled = false

    const currentQuestion = quizQuestion[currentQuestionIndex]

    questionspan.textContent = currentQuestionIndex + 1
    
    const progressPercent = (currentQuestionIndex / quizQuestion.length) * 100;
    progress.style.width = progressPercent + "%"

    question.textContent = currentQuestion.question

    answercontainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("answer-btn")

        // dataset ia a property of the button element that allows you to store custom data
        button.dataset.correct = answer.correct

        button.addEventListener("click", selectAnswer)

        answercontainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if(answersDisabled) return

    answersDisabled = true

    const selectButton = event.target;
    const iscorrect = selectButton.dataset.correct === "true"


    Array.from(answercontainer.children).forEach((button) => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }else{
            button.classList.add("incorrect");
        }
    });

    if(iscorrect) {
        score++;
        scorespan.textContent = score
    }


    setTimeout( () => {
        currentQuestionIndex++;

        if(currentQuestionIndex < quizQuestion.length){
            showQuestion()
        }else{
            showResults()
        }
    },1000)
}

function showResults() {
    questionscreen.classList.remove("active")
    resultscreen.classList.add("active")

    finalscore.textContent = score;

    const percentage = (score/quizQuestion.length) * 100

    if(percentage === 100) {
        messege.textContent = "Perfect! You are genius!";
    }else if (percentage >= 80) {
        messege.textContent = "Good job! You know your stuff!";
    }else if (percentage >= 60) {
        messege.textContent = "Good effort! Keep learning!";
    }else if (percentage >= 40) {
        messege.textContent = "Not bad! Try again to improve!";
    }else {
        messege.textContent = "Keep srudying! You'll get better!";
    }
}

function restartQuiz(){
     resultscreen.classList.remove("active");

     startQuiz();

}