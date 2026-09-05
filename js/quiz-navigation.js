const quizLink=document.getElementById("quizLink");

if(quizLink){

    quizLink.addEventListener("click",function(e){

        e.preventDefault();

        const currentPage=
        window.location.pathname;


        const isHomePage=
        currentPage.includes("index.html");


        if(!isHomePage){

            localStorage.setItem(
                "quizRedirect",
                "true"
            );

            window.location.href=
            "../index.html";

        }
        else{

            alert(
            "Please select a category first!"
            );

        }

    });

}