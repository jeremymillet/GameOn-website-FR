function editNav() {
  const nav = document.getElementById("myTopnav");
  if (nav.className === "topnav") {
    nav.className += " responsive";
  } else {
    nav.className = "topnav";
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
/**function that opens the modal
 */
function launchModal() {
  modalbg.style.display = "flex";
}
/**Function to close the modal
 */
function closeModal() {
  modalbg.style.display = "none";
}
// submit message
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
  /**
  * Function that validates input
  * @returns {boolean}
  */
  function checkInputs() {
    const firstNameStatus = champs(firstName, /^[a-zA-Z]{2,}$/)
    const lastNameStatus = champs(lastName, /^[a-zA-Z]{2,}$/)
    const emailStatus = champs(email, /@/)
    const nbTournamentsStatus = champs(nbTournaments, /^[0-9]+$/)
    const dateStatus = validerDate(date)
    const termsAndConditionsStatus = verifierCheckbox(termsAndConditions)
    const buttonsRadioStatus = checkRadioButton()

    return  firstNameStatus && lastNameStatus && emailStatus && nbTournamentsStatus && dateStatus && termsAndConditionsStatus && buttonsRadioStatus;
  }

  /**
  * Function that checks the result of checkInputs and calls the function disableSubmit with the result in params
  */
  function handleInput() {
    const isDisabled = !checkInputs();
    disableSubmit(isDisabled);
  }

  //handleInput()
  firstName.addEventListener("input", handleInput);
  lastName.addEventListener("input", handleInput);
  email.addEventListener("input", handleInput);
  nbTournaments.addEventListener("input", handleInput);
  date.addEventListener("input", handleInput);
  termsAndConditions.addEventListener("change", handleInput);
  buttonsRadio.forEach(bouton => bouton.addEventListener("change", handleInput));

}
/**
 * Function that enables or disables the submit button depending on the parameter
 * @param disabled {boolean}
 */
function disableSubmit(disabled) {
  if (disabled === false) {
    document
      .getElementById("btn-submit")
      .removeAttribute("disabled");
  }
}
/**function to check the inputs
 * @param nomDuChamps {HTMLElement}
 * @param regex {regexp} 
 * @param errorMessageClassName {string} 
 * @param errorMessage {string}
 * 
 * @returns {boolean}
 */
function champs( nomDuChamps, regex) {
  const status = regex.test(nomDuChamps.value);
  if (status) {
    nomDuChamps.parentElement.setAttribute('data-error-visible', "false");
  }
  else {
    nomDuChamps.parentElement.setAttribute('data-error-visible', "true");
  }
  return status
}
/**
 * function to check the input date
 * @param date {HTMLElement}
 * @returns {boolean}
 */
function validerDate(date) {
  const regexDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  
  if (!regexDate.test(date.value)) {
    date.parentElement.setAttribute('data-error-visible', "true");
    date.parentElement.setAttribute("data-error","La date doit avoir le format JJ/MM/YYYY");
      return false;
    }

  const dateEntree = new Date(date.value);
    const dateAujourdhui = new Date();

    if (dateEntree > dateAujourdhui) {
      date.parentElement.setAttribute('data-error-visible', "true");
      date.parentElement.setAttribute("data-error", "La date ne peut être dans le futur");
      return false;
    }
    else {
       date.parentElement.setAttribute('data-error-visible', "false");
       return true;
    }
}
/**
 * function to check the checkbox
 * @param checkbox {HTMLElement}
 * @returns {boolean}
 */
function verifierCheckbox(checkbox) {
    if (checkbox.checked) {
      checkbox.parentElement.setAttribute('data-error-visible', "false");
       return true;
    } else {
      checkbox.parentElement.setAttribute('data-error-visible', "true");
       return false;
    }
}
/**
 * function to check if one of the radio buttons is activated
 * @returns {boolean}
 */
function checkRadioButton() { 
  const buttonsRadio = document.querySelectorAll(".checkbox-input[type='radio']");
  const buttonsRadiosChecks = Array.from(buttonsRadio).some(bouton => bouton.checked);

  if (buttonsRadiosChecks) { 
    buttonsRadio[0].parentElement.setAttribute('data-error-visible', "false");
    return true;
  } else {
     buttonsRadio[0].parentElement.setAttribute('data-error-visible', "true");
    return false;
  }
}

setSubmitButton()