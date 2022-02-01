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