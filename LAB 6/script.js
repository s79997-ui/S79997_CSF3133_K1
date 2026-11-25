// 1. Questions Array: Stores questions, options, and the correct answer
const questions = [
    {
        question: "Which HTML tag is used to link an external JavaScript file?",
        options: ["<js>", "<script>", "<javascript>", "<link>"],
        answer: "<script>"
    },
    {
        question: "Which method is used to select an HTML element by its ID in JavaScript?",
        options: [
            "document.querySelectorAll()",
            "document.getElementByClass()",
            "document.getElementById()",
            "document.findElement()"
        ],
        answer: "document.getElementById()"
    },
    {
        question: "What does Math.random() return in JavaScript?",
        options: [
            "A random integer between 1 and 100",
            "A floating-point number between 0 (inclusive) and 1 (exclusive)",
            "A random boolean value",
            "A floating-point number between 1 and 10"
        ],
        answer: "A floating-point number between 0 (inclusive) and 1 (exclusive)"
    },
    {
        question: "Which event is triggered when a user clicks on an HTML element?",
        options: ["onmouseover", "onchange", "onclick", "onload"],
        answer: "onclick"
    },
    {
        question: "Which method prevents the default browser action for an event?",
        options: [
            "event.stopDefault()",
            "event.preventDefault()",
            "event.cancel()",
            "event.blockAction()"
        ],
        answer: "event.preventDefault()"
    }
];

// State variables
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let timerInterval = null;
let timeLeft = 15;

// DOM Elements
const startSection = document.getElementById("start-section");
const quizSection = document.getElementById("quiz-section");
const startBtn = document.getElementById("start-btn");
const questionCounter = document.getElementById("question-counter");
const timeLeftEl = document.getElementById("time-left");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackSection = document.getElementById("feedback-section");
const feedbackText = document.getElementById("feedback-text");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score-display");

// 2. shuffleQuestions(): Randomly shuffles the questions array (Fisher-Yates algorithm)
function shuffleQuestions() {
    shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
}

// 3. startTimer(): Sets a 15-second countdown timer for each question
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 15;
    timeLeftEl.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timeLeftEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}

// Helper function when timer reaches 0
function handleTimeOut() {
    const currentQ = shuffledQuestions[currentQuestionIndex];
    const allButtons = optionsContainer.querySelectorAll(".option-btn");

    allButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === currentQ.answer) {
            btn.classList.add("correct");
        }
    });

    feedbackSection.classList.remove("hidden", "feedback-correct");
    feedbackSection.classList.add("feedback-incorrect");
    feedbackText.textContent = `Time's up! The correct answer was: ${currentQ.answer}`;

    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
}

// 4. displayQuestion(): Displays the current question and answer options
function displayQuestion() {
    // Reset UI states
    selectedOption = null;
    submitBtn.disabled = true;
    submitBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
    feedbackSection.classList.add("hidden");
    optionsContainer.innerHTML = "";

    const currentQ = shuffledQuestions[currentQuestionIndex];
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
    questionText.textContent = currentQ.question;

    // Create option buttons
    currentQ.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");

        button.addEventListener("click", () => {
            // Remove 'selected' class from all buttons
            document.querySelectorAll(".option-btn").forEach(btn => btn.classList.remove("selected"));
            // Highlight clicked button
            button.classList.add("selected");
            selectedOption = option;
            submitBtn.disabled = false;
        });

        optionsContainer.appendChild(button);
    });
}

// 5. checkAnswer(): Checks if selected answer is correct and updates score
function checkAnswer() {
    if (!selectedOption) return;

    clearInterval(timerInterval);
    const currentQ = shuffledQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQ.answer;
    const allButtons = optionsContainer.querySelectorAll(".option-btn");

    // Disable all buttons and highlight correct/incorrect choices
    allButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === currentQ.answer) {
            btn.classList.add("correct");
        } else if (btn.textContent === selectedOption && !isCorrect) {
            btn.classList.add("incorrect");
        }
    });

    // Show real-time feedback
    feedbackSection.classList.remove("hidden", "feedback-correct", "feedback-incorrect");
    if (isCorrect) {
        score++;
        feedbackSection.classList.add("feedback-correct");
        feedbackText.textContent = "Correct! Well done.";
    } else {
        feedbackSection.classList.add("feedback-incorrect");
        feedbackText.textContent = `Incorrect! The correct answer is: ${currentQ.answer}`;
    }

    // Update footer score
    scoreDisplay.textContent = `Current Score: ${score} / ${shuffledQuestions.length}`;

    // Toggle Submit and Next buttons
    submitBtn.classList.add("hidden");
    nextBtn.textContent = (currentQuestionIndex === shuffledQuestions.length - 1) ? "Finish Quiz" : "Next Question";
    nextBtn.classList.remove("hidden");
}

// 6. nextQuestion(): Moves to next question, resets timer, or ends the quiz
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
        startTimer();
    } else {
        // End of quiz
        clearInterval(timerInterval);
        quizSection.classList.add("hidden");
        startSection.classList.remove("hidden");

        startSection.innerHTML = `
            <h2>Quiz Completed!</h2>
            <p>You scored <strong>${score}</strong> out of <strong>${shuffledQuestions.length}</strong>.</p>
            <button id="restart-btn" class="btn primary-btn">Restart Quiz</button>
        `;

        scoreDisplay.textContent = `Final Score: ${score} / ${shuffledQuestions.length}`;

        document.getElementById("restart-btn").addEventListener("click", startQuiz);
    }
}

// 7. startQuiz(): Shuffles questions, displays first question, and starts timer
function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    scoreDisplay.textContent = `Current Score: 0 / ${questions.length}`;

    startSection.classList.add("hidden");
    quizSection.classList.remove("hidden");

    shuffleQuestions();
    displayQuestion();
    startTimer();
}

// Event Listeners
startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", nextQuestion);