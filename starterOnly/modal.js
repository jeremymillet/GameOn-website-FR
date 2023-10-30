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
// close modal form
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
  function checkInputs() {
    const firstNameStatus = champs(firstName, /^[a-zA-Z]{2,}$/, "info-first-name", "valeur requise")
    const lastNameStatus = champs(lastName, /^[a-zA-Z]{2,}$/, "info-last-name", "valeur requise")
    const emailStatus = champs(email, /@/, "info-mail", "valeur avec un @ requise")
    const nbTournamentsStatus = champs(nbTournaments, /^[0-9]+$/, "info-nb-tournaments", "valeur numerique requise")
    const dateStatus = validerDate(date.value)
    const termsAndConditionsStatus = verifierCheckbox(termsAndConditions)
  
    return firstNameStatus && lastNameStatus && emailStatus && nbTournamentsStatus && dateStatus && termsAndConditionsStatus
  }

  function handleInput() {
    const isDisabled = !checkInputs();
    disableSubmit(isDisabled);
  }
  handleInput()
  firstName.addEventListener("input", handleInput);
  lastName.addEventListener("input", handleInput);
  email.addEventListener("input", handleInput);
  nbTournaments.addEventListener("input", handleInput);
  date.addEventListener("input", handleInput);
  termsAndConditions.addEventListener("change", handleInput);
}

function disableSubmit(disabled) {
    if (disabled === true) {
        document
            .getElementById("btn-submit")
            .setAttribute("disabled", true);
    } else {
        document
            .getElementById("btn-submit")
            .removeAttribute("disabled");
    }
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
function validerDate(date) {
    const regexDate =/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if (!regexDate.test(date)) {
       document.getElementsByClassName("info-date")[0].innerText ="La date est invalide. Utilisez le format AAAA-MM-JJ.";
      return false;
    }

    const dateEntree = new Date(date);
    const dateAujourdhui = new Date();

    if (dateEntree > dateAujourdhui) {
      document.getElementsByClassName("info-date")[0].innerText = "La date ne peut pas être dans le futur."
      return false;
    }
    else {
       document.getElementsByClassName("info-date")[0].innerText = ""
       return true;
    }
}
function verifierCheckbox(checkbox) {
    if (checkbox.checked) {
      document.getElementsByClassName("info-checkbox")[0].innerText = ""
       return true;
    } else {
      document.getElementsByClassName("info-checkbox")[0].innerText = "La case à cocher n'est pas cochée."
       return false;
    }
}

setSubmitButton()