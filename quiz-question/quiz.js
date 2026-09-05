protectPage();
const selectedCategory = localStorage.getItem("selectedCategory");
// All Questions
const allQuestions =
JSON.parse(localStorage.getItem("questions")) || [];

// Category Wise Questions
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

let filteredQuestions =
allQuestions.filter(
    (q) =>
    q.category?.trim().toLowerCase() ===
    selectedCategory?.trim().toLowerCase()
    &&
    q.email !== currentUser.email
);

console.log("Filtered Questions:", filteredQuestions);
// Shuffle Questions
filteredQuestions =
filteredQuestions.sort(() => 0.5 - Math.random());

// Take Only 10 Questions
filteredQuestions =
filteredQuestions.slice(0, 10);

// Quiz Variables
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;

// Elements
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const currentQuestion = document.getElementById("currentQuestion");
const totalQuestion = document.getElementById("totalQuestion");
const progress = document.querySelector(".progress");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

// =========================
// CHECK QUESTIONS
// =========================

if(filteredQuestions.length === 0){

    questionText.innerText = "No questions available in this category.";
    optionsContainer.innerHTML = "";
    nextBtn.style.display = "none";
    prevBtn.style.display = "none";
    totalQuestion.innerText = 0;
}
else{

    totalQuestion.innerText = filteredQuestions.length;
    loadQuestion();
}

// =========================
// LOAD QUESTION
// =========================
function loadQuestion(){
    const currentQuiz = filteredQuestions[currentQuestionIndex];

    if(!currentQuiz){
        return;
    }

    questionText.innerText = currentQuiz.question;
    currentQuestion.innerText = currentQuestionIndex + 1;

    // Progress
    const progressPercent = ((currentQuestionIndex + 1) / filteredQuestions.length) * 100;
    progress.style.width = progressPercent + "%";

    // Options
    optionsContainer.innerHTML = "";

currentQuiz.options.forEach((option) => {
    const label = document.createElement("label");
    label.className = "option";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = option;
    label.appendChild(input);
    label.appendChild(document.createTextNode(" " + option));
    optionsContainer.appendChild(label);
});

    // Previous Selected Answer
    if(userAnswers[currentQuestionIndex]){
        const selected =
        document.querySelectorAll(
            'input[name="answer"]'
        );

        selected.forEach((radio) => {
            if(
                radio.value ===
                userAnswers[currentQuestionIndex]
            ){
                radio.checked = true;
            }
        });
    }
}

// =========================
// SAVE ANSWER
// =========================
function saveAnswer(){

    const selectedOption =
    document.querySelector(
        'input[name="answer"]:checked'
    );

    if(selectedOption){
        userAnswers[currentQuestionIndex] =
        selectedOption.value;
    }
}

// =========================
// NEXT BUTTON
// =========================
nextBtn.addEventListener("click", function(){
    saveAnswer();
    if(
        currentQuestionIndex <
        filteredQuestions.length - 1
    ){
        currentQuestionIndex++;
        loadQuestion();
    }
    else{

        calculateResult();
    }

});

// =========================
// PREVIOUS BUTTON
// =========================
prevBtn.addEventListener("click", function(){

    saveAnswer();
    if(currentQuestionIndex > 0){
        currentQuestionIndex--;
        loadQuestion();
    }

});

// =========================
// CALCULATE RESULT
// =========================
function calculateResult(){
    score = 0;
    filteredQuestions.forEach((q, index) => {
        if(
            userAnswers[index] ===
            q.correctAnswer
        ){
            score++;
        }
    });

    localStorage.setItem(
        "score",
        score
    );

    localStorage.setItem(
        "totalQuestions",
        filteredQuestions.length
    );

    localStorage.setItem(
        "userAnswers",
        JSON.stringify(userAnswers)
    );

    localStorage.setItem(
        "quizQuestions",
        JSON.stringify(filteredQuestions)
    );

    // ==========================
    // SAVE RESULT HISTORY
    // ==========================
    const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

    // Previous Results
    let resultHistory =
    JSON.parse(
        localStorage.getItem("resultHistory")
    ) || [];

    // New Result Object
    const newResult = {
        email: currentUser.email,
        category: selectedCategory,
        score: score,
        total: filteredQuestions.length,
        date: new Date().toLocaleDateString()
    };

    // Add New Result
    resultHistory.push(newResult);

    // Save Again
    localStorage.setItem(
        "resultHistory",
        JSON.stringify(resultHistory)
    );

    window.location.href =
    "../result/result.html";
}

/* ================= TIMER ================= */
let timeLeft = 600;
const timer = document.getElementById("time")
const countdown = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timer.innerText = `${minutes}:${seconds}`;

    timeLeft--;
    if(timeLeft < 0){
        clearInterval(countdown);
        calculateResult();
    }
}, 1000);

// ==========================
// MOBILE NAVBAR TOGGLE
// ==========================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if(menuToggle){
    menuToggle.addEventListener(
    "click",
    ()=>{
        navLinks.classList.toggle(
            "active"
        );
    });
}