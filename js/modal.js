//DOM
let modalBg = document.querySelector(".bground");
let validationBtn = document.querySelector("#btn-envoi");
let launchBtn = document.querySelector("#contactButton");
let closeBtn = document.querySelector("#close");
let form = document.querySelector("#form");
let divForm = document.querySelector(".form");

//FORM var
let firstName = document.querySelector("#first");
let lastName = document.querySelector("#last");
let mail = document.querySelector("#email");
let message = document.querySelector("#message");

//FORM error
let errorFirstName = document.querySelector("#missfirst");
let errorLastName = document.querySelector("#misslast");
let errorMail = document.querySelector("#missemail");
let errorMessage = document.querySelector("#missmessage");

//Regex email
let mailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Event launch
launchBtn.addEventListener("click", launchModal);

//Event close
closeBtn.addEventListener("click", closeModal);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
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
  firstName.style.border = "none";
  lastName.style.border = "none";
  mail.style.border = "none";
  message.style.border = "none";
}

function closeModal() {
  modalBg.style.display = "none";
  launchBtn.style.display = "block";
}

/**
 *
 * @param {*} e valid firstName
 * @returns error / 2 carac mini or valid
 */
function validFirstName(e) {
  if (firstName.validity.valueMissing) {
    errorFirstName.textContent = "Veuillez renseigner votre prénom.";
    errorMessage.style.color = "red";
    firstName.style.border = "solid red 2px";
    firstName.classList.replace("text-control", "error-input");
    return false;
  } else if (firstName.value.length < 2) {
    errorFirstName.textContent =
      "Le prénom doit comporter au moins 2 caractères minimum.";
    firstName.classList.replace("text-control", "error-input");
    return false;
  } else {
    errorFirstName.textContent = " ";
    firstName.style.border = "solid green 2px";
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
  if (lastName.validity.valueMissing) {
    errorLastName.textContent = "Veuillez renseigner votre nom.";
    errorMessage.style.color = "red";
    lastName.style.border = "solid red 2px";
    lastName.classList.replace("text-control", "error-input");
    return false;
  } else if (lastName.value.length < 2) {
    errorLastName.textContent =
      "Le nom doit comporter au moins 2 caractères minimum.";
    lastName.classList.replace("text-control", "error-input");
    return false;
  } else {
    errorLastName.textContent = " ";
    lastName.style.border = "solid green 2px";
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
  if (mail.validity.valueMissing) {
    errorMail.textContent = "Veuillez renseigner votre adresse email.";
    errorMessage.style.color = "red";
    mail.style.border = "solid red 2px";
    mail.classList.replace("text-control", "error-input");
    return false;
  } else if (!mail.value.match(mailRegex)) {
    errorMail.textContent = "Veuillez renseigner une adresse mail valide.";
    mail.classList.replace("text-control", "error-input");
    return false;
  } else {
    errorMail.textContent = " ";
    mail.style.border = "solid green 2px";
    mail.classList.replace("error-input", "text-control");
    return true;
  }
}

/**
 *
 * @param {*} e valid Message
 * @returns error / too short or valid
 */
function validMessage(e) {
  if (message.value.valueMissing) {
    errorMessage.textContent = "Veuillez rédiger votre message.";
    errorMessage.style.color = "red";
    message.style.border = "solid red 2px";
    message.classList.replace("text-control", "error-input");
    return false;
  } else if (message.value.length < 6) {
    errorMessage.textContent = "Votre message est trop court.";
    message.style.border = "solid red 2px";
    message.classList.replace("text-control", "error-input");
    return false;
  } else {
    errorMessage.textContent = " ";
    message.style.border = "solid green 2px";
    message.classList.replace("error-input", "text-control");
    return true;
  }
}

/**
 *
 * @param {*} e if all inputs valid
 * @returns btn on valid form
 */
function validateForm(e) {
  let firstNameValid = validFirstName(e);
  let lastNameValid = validLastName(e);
  let mailValid = validEmail(e);
  let messageValid = validMessage(e);

  let isFormValid =
    firstNameValid && lastNameValid && mailValid && messageValid;

  if (isFormValid) {
    return true;
  } else {
    return false;
  }
}

//Console log with informations | if form valid => btn click send console.log
validationBtn.addEventListener("click", function (e) {
  if (validateForm(e)) {
    console.log("Prénom: " + firstName.value);
    console.log("Nom: " + lastName.value);
    console.log("Adresse email: " + mail.value);
    console.log("Message: " + message.value);

    modalBg.style.display = "none";
    launchBtn.style.display = "block";
    document.querySelector("#form").reset();
  }

  launchBtn.style.display = "block";
  e.preventDefault();
});
