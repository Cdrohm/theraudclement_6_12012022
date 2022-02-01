//DOM
let modalBg = document.querySelector(".bground");
let validationBtn = document.querySelector("#btn-submit");
let launchBtn = document.querySelector("#contact");
let closeBtn = document.querySelector("#close");

//FORM var
let firstName = document.querySelector("first");
let lastName = document.querySelector("last");
let mail = document.querySelector("email");
let message = document.querySelector("message");

//FORM error
let errorFirstName = document.querySelector("missfirst");
let errorLastName = document.querySelector("misslast");
let errorMail = document.querySelector("missemail");
let errorMessage = document.querySelector("missmessage");

//Regex email
let mailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Event launch
launchBtn.addEventListener("click", launchModal);

//Event close
closeBtn.addEventListener("click", closeModal);
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

//Validates
firstName.addEventListener("keyup", validFirstName);
lastName.addEventListener("keyup", validLastName);
mail.addEventListener("keyup", validEmail);
message.addEventListener("keyup", validMessage);

//F modal
function launchModal() {
    modalBg.style.display = "block";
    launchBtn.style.display = "none";
}

function closeModal () {
    modalBg.style.display = "none";
    launchBtn.style.display = "block";
}

/**
 * 
 * @param {*} e valid firstName
 * @returns error / 2 carac mini or valid
 */
function validFirstName(e) {
    if(firstName.validity.valueMissing) {
        e.preventDefault();
        errorFirstName.textContent = "Veuillez renseigner votre prénom.";
        firstName.classList.replace("text-control", "error-input");
        return false;

    } else if (firstName.value.length < 2) {
        e.preventDefault();
        errorFirstName.textContent = "Le prénom doit comporter au moins 2 caractères minimum.";
        firstName.classList.replace("text-control", "error-input");
        return false;

    } else {
        error.firstName.textContent = " ";
        firstName.classList.replace("error-input", "text-control");
        return true;
    }
}

/**
 * 
 * @param {*} e valid Last Name
 * @returns error / 2 carac mini or valid
 */
function validLastName(e) {
    if(lastName.validity.valueMissing) {
        e.preventDefault();
        errorLastName.textContent = "Veuillez renseigner votre nom.";
        lastName.classList.replace("text-control", "error-input");
        return false;

    } else if (lastName.value.length < 2) {
        e.preventDefault();
        errorLastName.textContent = "Le nom doit comporter au moins 2 caractères minimum."
        lastName.classList.replace("text-control", "error-input");
        return false

    } else {
        errorLastName.textContent = " ";
        lastName.classList.replace("error-input", "text-control");
        return true;
    }
}

/**
 * 
 * @param {*} e valid email 
 * @returns error / cf regex carac or valid
 */
function validEmail(e) {
    if(mail.validity.valueMissing) {
        e.preventDefault();
        errorMail.textContent = "Veuillez renseigner votre adresse email.";
        mail.classList.replace("text-control", "error-input");
        return false;

    } else if (!mailRegex.value.match(mailRegex)) {
        e.preventDefault();
        errorMail.textContent = "Veuillez renseigner une adresse mail valide.";
        mail.classList.replace("text-control", "error-input");
        return false;

    } else {
        errorMail.textContent = " ";
        mail.classList.replace("error-input", "text-control");
        return true;
    }
}