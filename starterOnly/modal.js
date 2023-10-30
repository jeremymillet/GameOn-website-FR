function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelectorAll(".close");
const modalBody = document.querySelector(".modal-body");
const modalForm = document.querySelector(".modal-form")
const btnSubmit = document.querySelector(".btn-submit")
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const nbTournaments = document.getElementById("quantity");
const date = document.getElementById("birthdate");
const termsAndConditions = document.getElementById("checkbox1")
const buttonsRadio = document.querySelectorAll(".checkbox-input[type='radio']");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "flex";
}

function closeModal() {
  modalbg.style.display = "none";
}

modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const success = document.createElement('div');
  const  successMessage = document.createElement('p');
  success.classList.add('success');
  successMessage.classList.add('success-message');
  successMessage.innerHTML = 'Merci pour <br/>votre inscription';
  modalBody.removeChild(modalForm);
  modalBody.appendChild(success);
  success.appendChild(successMessage);
});

function setSubmitButton() {
  function checkInputs() {
    const firstNameStatus = champs(firstName, /^[a-zA-Z]{2,}$/, "info-first-name", "valeur requise")
  
    
    return firstNameStatus 
  }

  function handleInput() {
    const isDisabled = !checkInputs();
    disableSubmit(isDisabled);
  }
  handleInput()
  firstName.addEventListener("input", handleInput);
}

function champs( nomDuChamps, regex,errorMessageClassName,errorMessage) {
  const status = regex.test(nomDuChamps.value);
  if (status) {
    document.getElementsByClassName(errorMessageClassName)[0].innerText = ""
  }
  else {
    document.getElementsByClassName(errorMessageClassName)[0].innerText = errorMessage
  }
  return status
}


setSubmitButton()