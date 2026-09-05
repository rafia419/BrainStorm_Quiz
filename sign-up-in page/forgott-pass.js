// Form
const form = document.querySelector("form");

// Inputs
const email = document.getElementById("email");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");


// Submit
form.addEventListener("submit", function(e){
    e.preventDefault();

    // Values
    const emailValue = email.value.trim();
    const newPasswordValue = newPassword.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();


    // Validation
    if(
        emailValue === "" ||
        newPasswordValue === "" ||
        confirmPasswordValue === ""
    ){
        alert("Please fill all fields!");
        return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(emailValue)){
        alert("Please enter a valid email address!");
        return;
    }

    // Password length validation
    if(newPasswordValue.length < 6){
        alert("Password must be at least 6 characters!");
        return;
    }

    // Strong password validation
    const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    if(!passwordPattern.test(newPasswordValue)){
        alert(
        "Password must contain uppercase, lowercase, number and special character!"
        );
        return;
    }

    // Password match
    if(newPasswordValue !== confirmPasswordValue){
        alert("Passwords do not match!");
        return;
    }


    // Get users
    let users = JSON.parse(localStorage.getItem("users")) || [];


    // Find user index
    const userIndex = users.findIndex(
        (user) => user.email === emailValue
    );


    // User check
    if(userIndex === -1){
        alert("Email not found!");
        return;
    }


    // Update password
    users[userIndex].password = newPasswordValue;

    // Save updated users
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("Password Reset Successful!");

    // Redirect
    window.location.href = "login.html";

});

const toggleIcons =
document.querySelectorAll(".toggle-password");

toggleIcons.forEach(icon => {

    icon.addEventListener("click", function(){

        const input =
        this.previousElementSibling;

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