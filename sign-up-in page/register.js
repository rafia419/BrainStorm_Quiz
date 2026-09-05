// Form select
const form = document.querySelector("form");

// Input select
const username = document.querySelector('input[type="text"]');
const email = document.querySelector('input[type="email"]');
const passwordInputs = document.querySelectorAll('input[type="password"]');
const password = passwordInputs[0];
const confirmPassword = passwordInputs[1];

// Form submit
form.addEventListener("submit", function(e){

    e.preventDefault();
    // Input values
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    // Empty field validation
    if(
        usernameValue === "" ||
        emailValue === "" ||
        passwordValue === "" ||
        confirmPasswordValue === ""
    ){
        alert("Please fill all fields!");
        return;
    }

    // Username validation
    if(usernameValue.length < 3){
        alert("Username must be at least 3 characters!");
        return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(emailValue)){
        alert("Please enter a valid email address!");
        return;
    }

    // Password validation
    if(passwordValue.length < 6){
        alert("Password must be at least 6 characters!");
        return;
    }

    const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;

    if(!passwordPattern.test(passwordValue)){
        alert(
        "Password must contain uppercase, lowercase, number and special character!"
        );
        return;
    }

    // Confirm password validation
    if(passwordValue !== confirmPasswordValue){
        alert("Passwords do not match!");
        return;
    }

    const user = {
        username: usernameValue,
        email: emailValue,
        password: passwordValue,
        joinDate: new Date().toDateString(),
        avatar: ""
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find(
        (u) => u.email === emailValue
    );

    if(userExists){
        alert("Email already registered!");
        return;
    }

    // Add new user
    users.push(user);
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("Registration Successful!");
    form.reset();
    window.location.href = "login.html";
});

const toggleIcons =
document.querySelectorAll(".toggle-password");

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