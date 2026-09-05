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