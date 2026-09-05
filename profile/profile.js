protectPage();
// ==========================
// CURRENT USER
// ==========================
JSON.parse(localStorage.getItem("currentUser"))
JSON.parse(localStorage.getItem("users"))

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

// fallback safety
if (!currentUser) {
    currentUser = {
        name: "Guest User",
        email: "No Email",
        password: "",
        joinDate: new Date().toDateString(),
        avatar: ""
    };
}

// ==========================
// ELEMENTS
// ==========================
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const joinDate = document.getElementById("joinDate");
const quizPlayed = document.getElementById("quizPlayed");
const correctAnswers = document.getElementById("correctAnswers");
const bestScore = document.getElementById("bestScore");
const averageScore = document.getElementById("averageScore");
const myQuestions = document.getElementById("myQuestions");
const profileImage = document.querySelector(".profile-image");

// ==========================
// USER INFO FIX
// ==========================
userName.innerText = currentUser.username || "User Name";
userEmail.innerText = currentUser.email;
joinDate.innerText = currentUser.joinDate;

if(currentUser.avatar){
    profileImage.innerHTML = `
        <img
            src="${currentUser.avatar}"
            style="
                width:120px;
                height:120px;
                border-radius:50%;
                object-fit:cover;
            "
        >
    `;
}

// ==========================
// QUIZ STATISTICS
// ==========================
const resultHistory = JSON.parse(localStorage.getItem("resultHistory")) || [];
const userResults = resultHistory.filter(
    r => r.email === currentUser.email
);

quizPlayed.innerText = userResults.length;

// total correct
let totalCorrect = userResults.reduce((sum, r) => sum + r.score, 0);
correctAnswers.innerText = totalCorrect;

// best score
let best = 0;
let bestTotal = 0;

userResults.forEach(r => {
    if (r.score > best) {
        best = r.score;
        bestTotal = r.total;
    }
});

bestScore.innerText = `${best}/${bestTotal || 0}`;

// average
let avg = 0;
if (userResults.length > 0) {
    let totalPercent = userResults.reduce((sum, r) => {
        return sum + (r.score / r.total) * 100;
    }, 0);

    avg = Math.floor(totalPercent / userResults.length);
}

averageScore.innerText = avg + "%";

// ==========================
// LEADERBOARD
// ==========================
const leaderboard = document.getElementById("leaderboard");
const userRank = document.getElementById("userRank");
const users = JSON.parse(localStorage.getItem("users")) || [];

// Create leaderboard data
let leaderboardData =
users.map(user => {

    const results =
    resultHistory.filter(
        r => r.email === user.email
    );

    const totalScore =
    results.reduce(
        (sum, r) => sum + r.score,
        0
    );

    return {
        username: user.username,
        email: user.email,
        score: totalScore
    };

});

// Sort by score
leaderboardData.sort(
    (a, b) => b.score - a.score
);

// Show Top 5
leaderboard.innerHTML = "";

leaderboardData
.slice(0,5)
.forEach((user, index) => {

    let medal = "";

    if(index === 0){
        medal = "🥇";
    }
    else if(index === 1){
        medal = "🥈";
    }
    else if(index === 2){
        medal = "🥉";
    }
    else{
        medal = "#" + (index + 1);
    }

    let you="";
    if(user.email === currentUser.email){
        you=" ⭐ You";
    }

    leaderboard.innerHTML += `
        <div class="leaderboard-item">
            <span>${medal} ${escapeHTML(user.username)}${you}</span>
            <span>Score: ${user.score}</span>
        </div>
    `;

});

// Current User Rank
const rank =
leaderboardData.findIndex(
    user => user.email === currentUser.email
);

userRank.innerText =
rank === -1 ?
"Not Ranked" :
`#${rank + 1}`;

// ==========================
// QUESTION STATISTICS
// ==========================
const allQuestions = JSON.parse(localStorage.getItem("questions")) || [];
const questionStats = document.getElementById("questionStats");
const totalQuestionsCreated = document.getElementById("totalQuestionsCreated");
const allUserQuestions =
allQuestions.filter(
    q => q.email === currentUser.email
);

let categoryCount = {};

allUserQuestions.forEach(q=>{

    let category =
    q.category.trim();

    if(categoryCount[category]){
        categoryCount[category]++;
    }
    else{
        categoryCount[category]=1;
    }

});

questionStats.innerHTML="";

Object.keys(categoryCount)
.forEach(category=>{

    questionStats.innerHTML += `
        <div class="question-stat-item">
            <span>
            ${escapeHTML(category)}
            </span>

            <span>
            ${categoryCount[category]} Questions
            </span>
        </div>
    `;

});

totalQuestionsCreated.innerText = allUserQuestions.length;

// ==========================
// QUIZ HISTORY
// ==========================

const quizHistory =
document.getElementById("quizHistory");

const userHistory =
resultHistory.filter(
    r => r.email === currentUser.email
);


quizHistory.innerHTML="";


if(userHistory.length === 0){

    quizHistory.innerHTML=`
        <div class="history-item">
            <h3>No Quiz Attempted Yet!</h3>
        </div>
    `;

}
else{

    userHistory
    .slice()
    .reverse()
    .forEach(result=>{

        quizHistory.innerHTML += `
            <div class="history-item">

                <h3>
                ${escapeHTML(result.category || "Unknown Category")}
                </h3>

                <p>
                <b>Score:</b>
                ${result.score}/${result.total}
                </p>

                <p>
                <b>Date:</b>
                ${result.date}
                </p>

            </div>
        `;

    });

}

// ==========================
// CATEGORY PERFORMANCE
// ==========================
const categoryPerformance = document.getElementById("categoryPerformance");
let categoryData = {};

userHistory.forEach(result=>{

    const category =
    result.category || "Unknown Category";

    if(!categoryData[category]){

        categoryData[category] = {
            correct:0,
            total:0
        };

    }

    categoryData[category].correct += result.score;
    categoryData[category].total += result.total;
});

categoryPerformance.innerHTML="";
Object.keys(categoryData)
.forEach(category=>{
    const data = categoryData[category];
    const percentage =
    Math.floor(
        (data.correct / data.total) * 100
    );

    categoryPerformance.innerHTML += `
    <div class="performance-item">
        <div class="performance-header">
            <span>
            ${escapeHTML(category)}
            </span>

            <span>
            ${percentage}%
            </span>
        </div>

        <div class="performance-bar">
            <div class="performance-fill"
            style="width:${percentage}%">
            </div>
        </div>

    </div>

    `;

});


// ==========================
// QUESTIONS
// ==========================
function escapeHTML(text){
    return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

//const allQuestions = JSON.parse(localStorage.getItem("questions")) || [];

const userQuestions = allQuestions.filter(
    q => q.email === currentUser.email
);

if (userQuestions.length === 0) {
    myQuestions.innerHTML = `
        <div class="question-card">
            <h3>No Questions Added Yet!</h3>
        </div>
    `;
} else {
        userQuestions.forEach((q,i)=>{

        myQuestions.innerHTML += `

        <div class="question-card">
            <h3>${i+1}. ${escapeHTML(q.question)}</h3>
            <p><b>Category:</b> ${escapeHTML(q.category)}</p>
            <p><b>Correct Answer:</b> ${escapeHTML(q.correctAnswer)}</p>

            <div class="question-actions">

                <button onclick="editProfileQuestion(${q.id})">
                <i class="fa-solid fa-pen"></i>
                Edit
                </button>

                <button onclick="deleteProfileQuestion(${q.id})">
                <i class="fa-solid fa-trash"></i>
                Delete
                </button>

            </div>

        </div>

         `;

        });
}

// ==========================
// PROFILE QUESTION ACTIONS
// ==========================


function deleteProfileQuestion(id){

    let questions = JSON.parse(localStorage.getItem("questions")) || [];
    questions = questions.filter( q=>q.id!==id );
    localStorage.setItem( "questions", JSON.stringify(questions) );

    alert("Question Deleted!");

    location.reload();
}

function editProfileQuestion(id){

    localStorage.setItem( "editQuestionId", id );
    window.location.href =
    "../add question/add-questions.html";
}


// ==========================
// ACHIEVEMENTS SYSTEM
// ==========================
const achievementList = document.getElementById("achievementList");

let badges = [
    {
        icon:"🏆",
        title:"Quiz Beginner",
        description:"Complete your first quiz",
        condition:userResults.length >= 1
    },

    {
        icon:"⭐",
        title:"Quiz Explorer",
        description:"Complete 5 quizzes",
        condition:userResults.length >= 5
    },

    {
        icon:"💯",
        title:"Perfect Score",
        description:"Get full marks in any quiz",
        condition:userResults.some(
        r => r.score === r.total
        )
    },

    {
        icon:"🔥",
        title:"Quiz Master",
        description:"Achieve 80%+ average score",
        condition:avg >= 80
    },

    {
        icon:"✍️",
        title:"Question Creator",
        description:"Add 5 questions",
        condition:allUserQuestions.length >= 5
    },

    {
        icon:"🧠",
        title:"Question Master",
        description:"Add 25 questions",
        condition:allUserQuestions.length >= 25
    },

    {
        icon:"👑",
        title:"Top Performer",
        description:"Reach top 3 leaderboard",
        condition:rank >=0 && rank <3
    },

    {
        icon:"🚀",
        title:"BrainStorm Legend",
        description:"20 quizzes + 90% average + 20 questions",
        condition:
        userResults.length >=20 &&
        avg >=90 &&
        allUserQuestions.length >=20
    }

];

achievementList.innerHTML="";

badges.forEach(badge=>{
    achievementList.innerHTML += `

    <div class="badge-card 
    ${badge.condition ? "" : "locked"}">

        <div class="badge-icon">
        ${badge.icon}
        </div>

        <div class="badge-content">
            <h3>
            ${badge.title}
            </h3>

            <p>
            ${badge.description}
            </p>
        </div>

        <div class="badge-status 
        ${badge.condition ? "unlocked" : "locked-text"}">
        ${badge.condition ? "✅ Unlocked" : "🔒 Locked"}
        </div>
    </div>
    `;
});


// ==========================
// SETTINGS
// ==========================
document.querySelectorAll(".setting-btn").forEach(btn => {
    btn.addEventListener("click", function () {

        const text = this.innerText;

        // CHANGE NAME
        if (text.includes("Change Name")) {
            const newName = prompt("Enter new name:");
            if (newName) {
                currentUser.username = newName;
                saveUser();
                userName.innerText = newName;
            }
        }

        // CHANGE PASSWORD (FIXED)
        if (text.includes("Change Password")) {

            const oldPass = prompt("Enter current password:");
            if (oldPass !== currentUser.password) {
                alert("Wrong current password!");
                return;
            }

            const newPass = prompt("Enter new password:");
            const confirmPass = prompt("Confirm new password:");

            // Empty check
            if (!newPass || !confirmPass) {
                alert("Please fill all fields!");
                return;
            }

            // Password length validation
            if (newPass.length < 6) {
                alert("Password must be at least 6 characters!");
                return;
            }

            // Strong password validation
            const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;

            if (!passwordPattern.test(newPass)) {
                alert(
                "Password must contain uppercase, lowercase, number and special character!"
                );
                return;
            }

            // Confirm password
            if (newPass !== confirmPass) {
                alert("Passwords do not match!");
                return;
            }

            // Update password
            currentUser.password = newPass;

            saveUser();
            alert("Password updated!");
        }

        // PROFILE PICTURE FIX
        if (text.includes("Change Profile Picture")) {

            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";

            input.onchange = function () {
                const file = input.files[0];

                const reader = new FileReader();
                reader.onload = function(e){

                    const img = new Image();

                    img.onload = function(){

                        const canvas =
                        document.createElement("canvas");

                        canvas.width = 150;
                        canvas.height = 150;

                        const ctx =
                        canvas.getContext("2d");

                        ctx.drawImage(
                            img,
                            0,
                            0,
                            150,
                            150
                        );

                        currentUser.avatar =
                        canvas.toDataURL(
                            "image/jpeg",
                            0.6
                        );

                        saveUser();

                        profileImage.innerHTML = `
                            <img src="${currentUser.avatar}">
                        `;
                    };

                    img.src = e.target.result;
                };

                reader.readAsDataURL(file);
            };

            input.click();
        }
    });
});


// ==========================
// SAVE USER
// ==========================
function saveUser() {

    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );

    let users =
    JSON.parse(
        localStorage.getItem("users")
    ) || [];

    users = users.map(user => {
        if(user.email === currentUser.email){
            return currentUser;
        }
        return user;
    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
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