// ==========================
// GET CURRENT USER
// ==========================
function getCurrentUser(){
    return JSON.parse(
        localStorage.getItem("currentUser")
    );
}

// ==========================
// CHECK LOGIN
// ==========================
function isLoggedIn(){
    return getCurrentUser() !== null;
}

// ==========================
// LOGOUT
// ==========================
function logout(){
    localStorage.removeItem(
        "currentUser"
    );

    window.location.href =
    "../index.html";
}

// ==========================
// UPDATE NAVBAR
// ==========================
function updateNavbar(){
    const user = getCurrentUser();
    const navButtons = document.getElementById( "navButtons" );
    const quizNav =
    document.getElementById(
        "quizNav"
    );

    const profileNav =
    document.getElementById(
        "profileNav"
    );

    if(!navButtons){
        return;
    }

    // =====================
    // LOGGED IN USER
    // =====================
    if(user){

        if(quizNav){
            quizNav.style.display =
            "block";
        }

        if(profileNav){
            profileNav.style.display =
            "block";
        }

        navButtons.innerHTML = `

        <div class="user-dropdown">
            <button class="user-btn">
                <i class="fa-solid fa-user"></i>
                ${user.username}
                <i class="fa-solid fa-chevron-down"></i>
            </button>

            <div class="user-menu">
                <a href="profile/profile.html">
                    Profile
                </a>

                <a href="add question/add-questions.html">
                    My Questions
                </a>

                <a onclick="logout()">
                    Logout
                </a>
            </div>

        </div>

        `;
        initUserDropdown();
    }

    // =====================
    // GUEST USER
    // =====================
    else{
        if(quizNav){
            quizNav.style.display =
            "none";
        }

        if(profileNav){
            profileNav.style.display =
            "none";
        }


        navButtons.innerHTML = `

        <a href="../sign-up-in page/login.html">
            <button class="sign-in">
            Sign In
            </button>
        </a>

        <a href="../sign-up-in page/register.html">
            <button class="sign-in">
            Sign Up
            </button>
        </a>

        `;

    }

}


// ==========================
// RUN WHEN PAGE LOAD
// ==========================
document.addEventListener(
"DOMContentLoaded",
function(){
    updateNavbar();
});

// ==========================
// PROTECT PAGE
// ==========================
function protectPage(){
    const user = getCurrentUser();

    if(!user){
        alert(
            "Please login first!"
        );

        window.location.href =
        "../sign-up-in page/login.html";
    }
}

// ==========================
// USER DROPDOWN
// ==========================
function initUserDropdown(){

    const userDropdown =
    document.querySelector(".user-dropdown");

    if(!userDropdown){
        return;
    }

    const userBtn =
    userDropdown.querySelector(".user-btn");

    userBtn.addEventListener("click",function(e){

        e.stopPropagation();

        userDropdown.classList.toggle("active");

    });

    document.addEventListener("click",function(e){

        if(!userDropdown.contains(e.target)){

            userDropdown.classList.remove("active");

        }

    });

}