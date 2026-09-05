const dropdown=document.querySelector(".dropdown");
const dropdownLink=dropdown.querySelector("a");

dropdownLink.addEventListener("click",function(e){

    e.preventDefault();

    dropdown.classList.toggle("active");

});

document.addEventListener("click",function(e){

    if(!dropdown.contains(e.target)){

        dropdown.classList.remove("active");

    }

});

document
.querySelectorAll(".dropdown-menu a")
.forEach(item=>{

    item.addEventListener("click",function(){

        dropdown.classList.remove("active");

        if(!getCurrentUser()){

            alert("Please login first!");

            window.location.href="../sign-up-in page/login.html";

            return;

        }

        localStorage.setItem(
            "selectedCategory",
            this.dataset.category
        );

        window.location.href="../quiz-question/quiz.html";

    });

});