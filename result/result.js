// Get Data

const score =
Number(localStorage.getItem("score")) || 0;

const totalQuestions =
Number(localStorage.getItem("totalQuestions")) || 0;


// Calculate

const wrongAnswers =
totalQuestions - score;

const percentage =
totalQuestions > 0
?
Math.round((score / totalQuestions) * 100)
:
0;


// Elements

const scoreText =
document.getElementById("scoreText");

const correctAnswers =
document.getElementById("correctAnswers");

const wrongAnswersText =
document.getElementById("wrongAnswers");

const percentageText =
document.getElementById("percentage");

const playAgainBtn =
document.getElementById("playAgainBtn");

const reviewBtn =
document.getElementById("reviewBtn");

const homeBtn =
document.getElementById("homeBtn");

const performanceTitle =
document.getElementById("performanceTitle");

const performanceText =
document.getElementById("performanceText");

const quizCategory =
document.getElementById("quizCategory");

const badge =
document.getElementById("badge");

const rank =
document.getElementById("rank");

// Show Result
const selectedCategory =
localStorage.getItem("selectedCategory") || "Unknown";

quizCategory.innerText =
selectedCategory;

scoreText.innerText =
`${score}/${totalQuestions}`;

correctAnswers.innerText =
score;

wrongAnswersText.innerText =
wrongAnswers;

percentageText.innerText =
`${percentage}%`;

// ==========================
// Calculate User Rank
// ==========================

const currentUser =
JSON.parse(localStorage.getItem("currentUser"));

const resultHistory =
JSON.parse(localStorage.getItem("resultHistory")) || [];


// Calculate total score for each user

const leaderboard = {};

resultHistory.forEach(result => {

    const email = result.email;

    if(!leaderboard[email]){
        leaderboard[email] = 0;
    }

    leaderboard[email] += Number(result.score) || 0;

});


// Convert object to array and sort

const rankingList =
Object.entries(leaderboard)
.sort((a,b)=> b[1] - a[1]);


// Find current user's rank

if(currentUser){

    const userRank =
    rankingList.findIndex(
        user => user[0] === currentUser.email
    ) + 1;


    if(userRank > 0){

        rank.innerText =
        `#${userRank}`;

    }
    else{

        rank.innerText =
        "N/A";

    }

}
else{

    rank.innerText =
    "N/A";

}

correctAnswers.innerText = score;
wrongAnswersText.innerText = wrongAnswers;
percentageText.innerText = `${percentage}%`;

if(percentage === 100){

    performanceTitle.innerText =
    "🏆 Perfect Score!";

    performanceText.innerText =
    "Amazing! You answered every question correctly.";

    badge.innerText =
    "🏆 Quiz Legend";
}

else if(percentage >= 90){

    performanceTitle.innerText =
    "🥇 Excellent!";

    performanceText.innerText =
    "Outstanding performance. Keep it up!";

    badge.innerText =
    "🥇 Gold";
}

else if(percentage >= 75){

    performanceTitle.innerText =
    "🎉 Great Job!";

    performanceText.innerText =
    "Very good performance. You're doing great.";

    badge.innerText =
    "🥈 Silver";
}

else if(percentage >= 60){

    performanceTitle.innerText =
    "👍 Good Effort!";

    performanceText.innerText =
    "Nice work. Practice a little more.";

    badge.innerText =
    "🥉 Bronze";
}

else{

    performanceTitle.innerText =
    "📚 Keep Practicing!";

    performanceText.innerText =
    "Don't give up. Practice makes perfect.";

    badge.innerText =
    "📘 Beginner";
}
// Play Again Button

playAgainBtn.addEventListener(
    "click",
    function(){

        const selectedCategory =
        localStorage.getItem(
            "selectedCategory"
        );

        if(selectedCategory){

            window.location.href =
            "../quiz-question/quiz.html";

        }
        else{

            window.location.href =
            "../categories-wise question/categories.html";

        }
    }
);


// Buttons

reviewBtn.addEventListener("click", function(){

    window.location.href =
    "../review-question/review.html";

});


homeBtn.addEventListener("click", function(){

    window.location.href =
    "../index.html";

});

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