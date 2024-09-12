const signupPages = document.querySelectorAll('.signup-page');
const translateAmount = 100;
let translate = 0;

slide = (direction) => {

    direction === "next" ? translate -= translateAmount : translate += translateAmount;

    signupPages.forEach(
        signupPages => (signupPages.style.transform = `translateX(${translate}%)`)
    )

};

