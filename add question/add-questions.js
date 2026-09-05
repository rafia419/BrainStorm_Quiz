protectPage();
const form = document.getElementById("questionForm");
const category = document.getElementById("category");
const question = document.getElementById("question");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const correctAnswer = document.getElementById("correctAnswer");
const allQuestions = document.getElementById("allQuestions");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
let questions = JSON.parse(localStorage.getItem("questions")) || [];
const editQuestionId = localStorage.getItem("editQuestionId");

displayQuestions();

if(editQuestionId){
    const editQuestion =
    questions.find(
        q => q.id == editQuestionId
    );

    if(editQuestion){

        category.value =
        editQuestion.category;

        question.value =
        editQuestion.question;

        option1.value =
        editQuestion.options[0];

        option2.value =
        editQuestion.options[1];

        option3.value =
        editQuestion.options[2];

        option4.value =
        editQuestion.options[3];

        correctAnswer.value =
        editQuestion.options.indexOf(
            editQuestion.correctAnswer
        ) + 1;
    }
}

const submitBtn = document.getElementById("submitBtn");
if(editQuestionId){
    submitBtn.innerText =
    "Update Question";
}

// =========================
// ESCAPE HTML
// =========================
function escapeHTML(text){
    return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// =========================
// QUIZ LINK
// =========================
const quizLink =
document.getElementById("quizLink");

function showQuizAlert(){

    alert(
        "Please select a category first!"
    );

    window.location.href =
    "../categories-wise question/categories.html";
}

if(quizLink){
    quizLink.addEventListener(
        "click",
        function(e){

            e.preventDefault();

            showQuizAlert();

        }
    );

}

// =========================
// ADD QUESTION
// =========================
form.addEventListener("submit", function(e){

    e.preventDefault();

    const newQuestion = {
        id: Date.now(),
        email: currentUser.email,
        category: category.value,
        question: question.value.trim(),
        options: [
            option1.value.trim(),
            option2.value.trim(),
            option3.value.trim(),
            option4.value.trim()
        ],
        correctAnswer:
        document.getElementById(
            "option" + correctAnswer.value
        ).value
    };

    if(
        newQuestion.category === "" ||
        newQuestion.question === "" ||
        newQuestion.options.includes("") ||
        correctAnswer.value === ""
    ){
        alert("Please fill all fields!");
        return;
    }

    const duplicate = questions.find(
        (q) =>
            q.question.toLowerCase() ===
            newQuestion.question.toLowerCase() && q.id != editQuestionId
    );

    if(duplicate){
        alert("Question already exists!");
        return;
    }

    questions.push(newQuestion);

    localStorage.setItem(
        "questions",
        JSON.stringify(questions)
    );

    alert("Question Added Successfully!");

    form.reset();

    displayQuestions();

});

// =========================
// DISPLAY QUESTIONS
// =========================

function displayQuestions(){

    allQuestions.innerHTML = "";


    const myQuestions = questions.filter(
        (q) => q.email === currentUser.email
    );

    if(myQuestions.length === 0){

        allQuestions.innerHTML =
        "<p>No questions added yet!</p>";

        return;
    }

    myQuestions.forEach((q) => {

        allQuestions.innerHTML += `

        <div class="question-card">

            <h3>${escapeHTML(q.question)}</h3>

            <p><b>Category:</b>${escapeHTML(q.category)}</p>

            <p><b>Correct Answer:</b>
            ${escapeHTML(q.correctAnswer)}</p>

            <div class="question-actions">

                <button
                class="edit-btn"
                onclick="editQuestion(${q.id})">

                Edit

                </button>

                <button
                class="delete-btn"
                onclick="deleteQuestion(${q.id})">

                Delete

                </button>

            </div>

        </div>

        `;
    });

}

// =========================
// DELETE QUESTION
// =========================
function deleteQuestion(id){

    questions =
    questions.filter((q) => q.id !== id);

    localStorage.setItem(
        "questions",
        JSON.stringify(questions)
    );

    displayQuestions();

}

function editQuestion(id){

    const selectedQuestion =
    questions.find((q) => q.id === id);

    category.value =
    selectedQuestion.category;

    question.value =
    selectedQuestion.question;

    option1.value =
    selectedQuestion.options[0];

    option2.value =
    selectedQuestion.options[1];

    option3.value =
    selectedQuestion.options[2];

    option4.value =
    selectedQuestion.options[3];


    const correctIndex =
    selectedQuestion.options.indexOf(
        selectedQuestion.correctAnswer
    ) + 1;

    correctAnswer.value =
    correctIndex;

    // Delete old question first
    questions =
    questions.filter((q) => q.id !== id);

    localStorage.setItem(
        "questions",
        JSON.stringify(questions)
    );

    displayQuestions();
}

// ==========================
// MOBILE NAVBAR TOGGLE
// ==========================

const menuToggle =
document.getElementById("menuToggle");

const navLinks =
document.getElementById("navLinks");


if(menuToggle && navLinks){

    menuToggle.addEventListener(
        "click",
        function(){

            navLinks.classList.toggle(
                "active"
            );

        }
    );

}