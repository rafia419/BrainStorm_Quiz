const form = document.querySelector("form");
const email = document.querySelector('input[type="email"]');
const password = document.querySelector('input[type="password"]');

form.addEventListener("submit", function(e){

    e.preventDefault();

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if(emailValue === "" || passwordValue === ""){
        alert("Please fill all fields!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(
        (user) =>
            user.email === emailValue &&
            user.password === passwordValue
    );

    // Login check
    if(validUser){
        localStorage.setItem(
            "currentUser",
            JSON.stringify(validUser)
        );

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );

        alert("Login Successful!");
        window.location.href = "../index.html";
    }
    else{
        alert("Invalid Email or Password!");
    }
});

const toggleIcons = document.querySelectorAll(".toggle-password");

toggleIcons.forEach(icon => {
    icon.addEventListener("click", function(){
        const input = this.previousElementSibling;

        if(input.type === "password"){
            input.type = "text";
            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");
        }

        else{
            input.type = "password";
            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");
        }
    });
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