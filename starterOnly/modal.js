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
const modalbdy = document.querySelector(".modal-body");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const formReserve = document.querySelector("#formReserve");

// Modal 
const modalClose = document.querySelector(".close");
const subBtn = document.querySelector(".btn-submit");
const subBtnClose = document.querySelector(".btn-sub-close");

// Form in modal
const form = {
  firstname: document.querySelector("#first"),
  lastname: document.querySelector("#last"),
  email: document.querySelector("#email"),
  birthdate: document.querySelector("#birthdate"),
  quantity: document.querySelector("#quantity"),
  location: document.querySelectorAll(".check-location"),
  userCondition: document.querySelector("#checkbox1")
}

// Checkbox in form
const labelRadio = document.querySelector(".text-label");

let errors = [];



// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal event
modalClose.addEventListener("click", closeModal);


// Check the completion of the input dynamically
formReserve.addEventListener("input", (e) => {
  checkInput(e.target.name);
})

// Check the completion of the form before submit
formReserve.addEventListener("submit", (e) => {
  // Avoid form submit
  e.preventDefault();
  checkForm();
  if (errors.length === 0) validationSuccess();
})


// Avoid not number keypress in the quantity form
form['quantity'].addEventListener('keydown', (e) => {
  let allowKeyPress = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace", "ArrowRight", "ArrowLeft"];
  if (allowKeyPress.includes(e.key)) {
  } else {
    e.preventDefault();
  }
})

// Close the modal form and submit if it's complete 
subBtn.addEventListener('click', () => {
  if (subBtn.classList.contains('btn-sub-close')) {
    formReserve.submit();
  }
})

// Launch modal form and remove error in case of modal close
function launchModal() {
  resetError();
  modalbg.style.display = "block";
}

// Close the modal form and submit if it's complete 
function closeModal() {
  if (subBtn.classList.contains('btn-sub-close')) {
    formReserve.submit();
  } else {
    modalbg.style.display = "none";
  }

}

function checkForm() {
  for (let prop in form) {
    checkInput(prop);
  }
}

// Check the completion of form and push error in array
function checkInput(name) {

  let cities = Array.from(form['location']);

  let checks = {
    firstname: form['firstname'].value.length >= 2,
    lastname: form['lastname'].value.length >= 2,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(form['email'].value),
    birthdate: form['birthdate'].value != '',
    quantity: form['quantity'].value != '' && form['quantity'].value.length <= 2,
    location: cities.some(loc => loc.checked === true),
    userCondition: form['userCondition'].checked
  };

  if (!checks[name]) {
    errors.push(name);
  } else {
    errors = errors.filter(err => err != name);
  }

  validationFailure();
}

function resetError() {
  errors = [];
  validationFailure();
}


function validationSuccess() {
  // Hide the form
  formData.forEach((formData) => {
    formData.style.visibility = 'hidden';
    formData.style.opacity = 0;
  });
  labelRadio.style.visibility = 'hidden';
  labelRadio.style.opacity = 0;

  messageValidation();

  // Change text of btn and add class 'btn-sub-close' 
  subBtn.value = 'Fermer';
  subBtn.classList.add('btn-sub-close');
}

// Create and appear validation message
function messageValidation() {
  let textValid = document.createElement('p');
  textValid.innerHTML = '<span>Merci pour<br>votre inscription</span>';
  textValid.style.position = 'absolute';
  textValid.style.top = '40%';
  textValid.style.left = '50%';
  textValid.style.transform = 'translateX(-50%)';
  textValid.style.width = '100%';
  textValid.style.fontSize = '36px';
  textValid.style.textAlign = 'center';
  modalbdy.prepend(textValid);
}

function validationFailure() {

  let errorText = {
    firstname: 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
    lastname: 'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
    email: 'Veuillez entrer une adresse email valide.',
    birthdate: 'Veuillez renseigner votre date de naissance.',
    quantity: 'Veuillez entrer une valeur numérique entre 0 et 99.',
    location: 'Vous devez choisir une option.',
    userCondition: 'Vous devez vérifier que vous acceptez les termes et conditions.'
  }

  for (let prop in form) {
    // Reset error display on the input
    if (prop != 'location' && form[prop].parentNode.hasAttribute("data-error")) {
      form[prop].parentNode.removeAttribute("data-error");
      form[prop].parentNode.removeAttribute("data-error-visible");
    } else if (prop == 'location' && form[prop][0].parentNode.hasAttribute("data-error")) {
      form[prop][0].parentNode.removeAttribute("data-error");
      form[prop][0].parentNode.removeAttribute("data-error-visible");
    }
    errors.forEach(err => {
      // Add error display and text error on the input
      if (prop != 'location' && err == prop) {
        form[prop].parentNode.setAttribute("data-error", errorText[prop]);
        form[prop].parentNode.setAttribute("data-error-visible", "true");
      } else if (prop == 'location' && err == prop) {
        form[prop][0].parentNode.setAttribute("data-error", errorText[prop]);
        form[prop][0].parentNode.setAttribute("data-error-visible", "true");
      }
    })
  }

}

