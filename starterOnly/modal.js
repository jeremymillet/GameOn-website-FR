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