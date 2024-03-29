const quizData = [
    {
        question: "What does 'empathy' mean?",
        options: ["Feeling sorry for someone", "Understanding and sharing the feelings of others", "Being afraid of others", "Ignoring others"],
        correctOption: 1,
    },
    {
        question: "Why is it important to be kind to others?",
        options: ["To show off", "Because it feels good", "To get something in return", "Because everyone else is doing it"],
        correctOption: 1,
    },
    {
        question: "What does 'resilience' mean?",
        options: ["Being mean to others", "Bouncing back from challenges", "Giving up easily", "Ignoring challenges"],
        correctOption: 1,
    },
];

let currentQuestionIndex = 0;
let userScore = 0;

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");

function startQuiz() {
    showQuestion();
}

function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;

    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });

    nextButton.style.display = "none";
}

function checkAnswer(userAnswer) {
    const currentQuestion = quizData[currentQuestionIndex];

    if (userAnswer === currentQuestion.correctOption) {
        resultElement.textContent = "Correct!";
        userScore++;
    } else {
        resultElement.textContent = "Wrong! The correct answer was " + currentQuestion.options[currentQuestion.correctOption];
    }

    nextButton.style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    questionElement.textContent = "Quiz completed!";
    optionsContainer.innerHTML = "";
    resultElement.textContent = "";
    nextButton.style.display = "none";
    scoreElement.textContent = "Your final score is " + userScore + "/" + quizData.length;
}
window.onload = startQuiz;