// Get Data

const quizQuestions =
JSON.parse(localStorage.getItem("quizQuestions")) || [];

const userAnswers =
JSON.parse(localStorage.getItem("userAnswers")) || [];


// Element

const reviewList =
document.getElementById("reviewList");


// Check Empty

if(quizQuestions.length === 0){

    reviewList.innerHTML = `

        <div class="review-card">

            <h3>No review data found!</h3>

        </div>

    `;
}
else{

    showReview();
}



// Show Review

function escapeHTML(text){

    return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

}

function showReview(){

    reviewList.innerHTML = "";


    quizQuestions.forEach((question, index) => {

        const userAnswer =
        userAnswers[index] || "No Answer";

        const correctAnswer =
        question.correctAnswer;

        const isCorrect =
        userAnswer === correctAnswer;


        reviewList.innerHTML += `

        <div class="review-card">

            <div class="review-left">

            <h3>
                Q${index + 1}.
                ${escapeHTML(question.question)}
            </h3>

            <p>
                <span>Your Answer:</span>

                <span class="${
                    isCorrect
                    ?
                    "correct-answer"
                    :
                    "wrong-answer"
                }">

                    ${escapeHTML(userAnswer)}

                </span>

            </p>

            <p>

                <span>Correct Answer:</span>

                <span>

                    ${escapeHTML(correctAnswer)}

                </span>

            </p>

            </div>


            <div class="review-icon">

                ${
                    isCorrect
                    ?
                    '<i class="fa-solid fa-circle-check correct-icon"></i>'
                    :
                    '<i class="fa-solid fa-circle-xmark wrong-icon"></i>'
                }

            </div>

        </div>

        `;
    });

}

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