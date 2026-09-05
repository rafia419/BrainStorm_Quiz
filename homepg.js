//==========================
// CURRENT USER
//==========================
const currentUser=JSON.parse(localStorage.getItem("currentUser"));
const navButtons=document.getElementById("navButtons");
const quizNav=document.getElementById("quizNav");
const profileNav=document.getElementById("profileNav");

//==========================
// NAVBAR
//==========================
function loadNavbar(){

    if(currentUser){

        quizNav.style.display="block";
        profileNav.style.display="block";

        navButtons.innerHTML=`
        <div class="user-dropdown">
            <button class="user-btn">
                <i class="fa-solid fa-user"></i>
                ${currentUser.username}
                <i class="fa-solid fa-chevron-down"></i>
            </button>

            <div class="user-menu">
                <a href="profile/profile.html">
                    <i class="fa-solid fa-user"></i>
                    Profile
                </a>

                <a href="add question/add-questions.html">
                    <i class="fa-solid fa-plus"></i>
                    Add Question
                </a>

                <a href="#" onclick="logout()">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    Logout
                </a>
            </div>
        </div>
        `;

    }
    else{

        quizNav.style.display="none";
        profileNav.style.display="none";

        navButtons.innerHTML=`
        <a href="sign-up-in page/login.html">
            <button class="sign-in">
                Sign In
            </button>
        </a>

        <a href="sign-up-in page/register.html">
            <button class="sign-in">
                Sign Up
            </button>
        </a>
        `;

    }

}

//==========================
// LOGOUT
//==========================
function logout(){

    const confirmLogout=confirm(
        "Are you sure you want to logout?"
    );

    if(!confirmLogout){
        return;
    }

    localStorage.removeItem("currentUser");

    alert("Logged out successfully!");

    window.location.href="index.html";

}

//==========================
// LOGIN CHECK
//==========================
function checkLogin(){

    if(currentUser){
        return true;
    }

    alert("Please Sign In first!");

    window.location.href=
    "sign-up-in page/login.html";

    return false;

}

//==========================
// INITIALIZE
//==========================
loadNavbar();

//==========================
// DATA
//==========================
const users=JSON.parse(localStorage.getItem("users"))||[];
const questions=JSON.parse(localStorage.getItem("questions"))||[];
const history=JSON.parse(localStorage.getItem("resultHistory"))||[];
const categories=[
    ...new Set(
        questions.map(q=>q.category.trim())
    )
];

//==========================
// COUNTER ANIMATION
//==========================
function animateCounter(id,target){
    let current=0;
    const increment=Math.max(
        1,
        Math.ceil(target/40)
    );

    const interval=setInterval(()=>{
        current+=increment;
        if(current>=target){
            current=target;
            clearInterval(interval);
        }
        document.getElementById(id).innerText=current;
    },25);
}

animateCounter("totalUsers",users.length);
animateCounter("totalQuestions",questions.length);
animateCounter("totalAttempts",history.length);
animateCounter("totalCategories",categories.length);

//==========================
// HOME STATISTICS
//==========================
const totalUsers=document.getElementById("totalUsers");
const totalQuestions=document.getElementById("totalQuestions");
const totalAttempts=document.getElementById("totalAttempts");
const totalCategories=document.getElementById("totalCategories");

totalUsers.innerText=users.length;
totalQuestions.innerText=questions.length;
totalAttempts.innerText=history.length;

totalCategories.innerText=categories.length;

//==========================
// CATEGORY PREVIEW
//==========================
const categoryCards=document.getElementById("categoryCards");

const categoryIcons={
    "HTML":"🌐",
    "CSS":"🎨",
    "JavaScript":"⚡",
    "Machine Learning":"🤖",
    "General Knowledge":"🧠"
};

const categoryCount={};

questions.forEach(question=>{

    const category=question.category.trim();

    categoryCount[category]=(categoryCount[category]||0)+1;

});

categoryCards.innerHTML="";
if(Object.keys(categoryCount).length === 0){
    categoryCards.innerHTML = `
    <div class="empty-box">
        <h3>
        📚 No Categories Available
        </h3>
        <p>
        Be the first one to add questions!
        </p>
    </div>
    `;
}

else{
    Object.keys(categoryCount)
    .forEach(category=>{
        categoryCards.innerHTML+=`
        <div class="category-card">
            <div class="category-icon">
                ${categoryIcons[category]||"📚"}
            </div>
            <h3>
                ${category}
            </h3>
            <p>
                ${categoryCount[category]}
                Questions Available
            </p>

            <button onclick="goCategory('${category}')">
                Start Quiz
            </button>
        </div>
        `;
    });
}

//==========================
// HOME LEADERBOARD
//==========================
const leaderboard=document.getElementById("homeLeaderboard");

let leaderboardData=users.map(user=>{

    const results=history.filter(
        r=>r.email===user.email
    );

    const totalScore=results.reduce(
        (sum,r)=>sum+r.score,
        0
    );

    return{
        username:user.username,
        score:totalScore
    };

});

leaderboardData.sort(
    (a,b)=>b.score-a.score
);

const medals=[
    "🥇",
    "🥈",
    "🥉"
];

leaderboard.innerHTML="";

if(leaderboardData.length===0){

    leaderboard.innerHTML=`
    <div class="home-leader-card">
        <h3>No Players Yet</h3>
        <p>Leaderboard will appear here.</p>
    </div>
    `;

}
else{

    leaderboardData
    .slice(0,3)
    .forEach((user,index)=>{

        leaderboard.innerHTML+=`
        <div class="home-leader-card">

            <h3>${medals[index]||"🏅"}</h3>

            <h2>${user.username}</h2>

            <p>Score: ${user.score}</p>

        </div>
        `;

    });

}

//==========================
// CATEGORY NAVIGATION
//==========================
function goCategory(category){

    if(!checkLogin()){
        return;
    }

    localStorage.setItem(
        "selectedCategory",
        category
    );

    window.location.href=
    "quiz-question/quiz.html";

}

//==========================
// HERO BUTTONS
//==========================
const startBtn=document.querySelector(".start-btn");
const exploreBtn=document.querySelector(".explore-btn");

if(startBtn){

    startBtn.addEventListener("click",function(){

        if(!checkLogin()){
            return;
        }

        window.location.href=
        "quiz-question/quiz.html";

    });

}

if(exploreBtn){

    exploreBtn.addEventListener("click",function(){

        document.querySelector(".categories-preview")
        .scrollIntoView({
            behavior:"smooth"
        });

    });

}

//==========================
// CATEGORY DROPDOWN
//==========================
document
.querySelectorAll(".dropdown-menu a")
.forEach(link=>{

    link.addEventListener("click",function(){

        if(!checkLogin()){
            return;
        }

        localStorage.setItem(
            "selectedCategory",
            this.dataset.category
        );

        window.location.href=
        "quiz-question/quiz.html";
    });
});

//==========================
// PROTECT LINKS
//==========================
document
.querySelectorAll(".signLink")
.forEach(link=>{

    link.addEventListener("click",function(e){

        if(checkLogin()){
            return;
        }

        e.preventDefault();

    });

});

//==========================
// PAGE READY
//==========================
console.log(
    "BrainStorm Homepage Loaded Successfully!"
);

const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
    if(window.scrollY > 300){
        topBtn.style.display = "block";
    }
    else{
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
});

if(quizNav){
    quizNav.addEventListener("click",function(e){
        e.preventDefault();
        alert(
        "Please select a category first!"
        );
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

// ==========================
// DYNAMIC FOOTER YEAR
// ==========================
const year = document.getElementById("year");

if(year){
    year.innerText =
    new Date().getFullYear();
}