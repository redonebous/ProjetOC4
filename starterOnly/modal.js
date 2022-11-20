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
  quantEvent: document.querySelector("#quantity"),
  locEvent: document.querySelector("#location1"),
  userCondition: document.querySelector("#checkbox1")
}


// Checkbox in form
const loc1Form = document.querySelector("#location1");
const loc2Form = document.querySelector("#location2");
const loc3Form = document.querySelector("#location3");
const loc4Form = document.querySelector("#location4");
const loc5Form = document.querySelector("#location5");
const loc6Form = document.querySelector("#location6");
const labelRadio = document.querySelector(".text-label");

let errors = [];

const errorText = {
  firstname: 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
  lastname: 'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
  email: 'Veuillez entrer une adresse email valide.',
  birthdate: 'Veuillez renseigner votre date de naissance.',
  quantEvent: 'Veuillez entrer une valeur numérique.',
  locEvent: 'Vous devez choisir une option.',
  userCondition: 'Vous devez vérifier que vous acceptez les termes et conditions.'
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalClose.addEventListener("click", closeModal);


// completion control of the form before submit
formReserve.addEventListener("submit", (e) => {
  // Avoid form submit
  e.preventDefault();

  if (checkForm()) {
    // Affichage message réussite
    validationSuccess();
  } else {
    // Affichage message échec
    validationFailure();
  }

})

subBtn.addEventListener('click', () => {
  if (subBtn.classList.contains('btn-sub-close')) {
    formReserve.submit();
  }
})

// launch modal form
function launchModal() {
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

// Vérifie que chacun des champs soit complété correctement
function checkForm() {
  let checks = {
    firstname: form['firstname'].value.length > 2,
    lastname: form['lastname'].value.length > 2,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(form['email'].value),
    birthdate: form['birthdate'].value != '',
    quantEvent: form['quantEvent'].value != '',
    locEvent: (loc1Form.checked || loc2Form.checked || loc3Form.checked || loc4Form.checked || loc5Form.checked || loc6Form.checked),
    userCondition: form['userCondition'].checked
  };

  /* console.log(form['userCondition']);
  console.log(checks); */
  console.log(checks['firstname'] && checks['lastname'] && checks['email'] && checks['birthdate'] && checks['quantEvent'] && checks['locEvent'] && checks['userCondition']);


  if (checks['firstname'] && checks['lastname'] && checks['email'] && checks['birthdate'] && checks['quantEvent'] && checks['locEvent'] && checks['userCondition']) {
    return true;
  } else {
    errors = [];
    for (let check in checks) {
      if (!checks[check]) {
        errors.push(check);
      }
    }
    return false;
  }

}

function validationSuccess() {
  // Masquer le form
  formData.forEach((formData) => {
    formData.style.visibility = 'hidden';
    formData.style.opacity = 0;
  });
  labelRadio.style.visibility = 'hidden';
  labelRadio.style.opacity = 0;

  messageValidation();

  // Change text of btn + add class 'btn-sub-close' 
  subBtn.value = 'Fermer';
  subBtn.classList.add('btn-sub-close');
}

// Create and appear validation message
function messageValidation() {
  let textValid = document.createElement('p');
  textValid.textContent = 'Merci pour votre inscription';
  textValid.style.position = 'absolute';
  textValid.style.top = '40%';
  textValid.style.left = '50%';
  textValid.style.transform = 'translateX(-50%)';
  textValid.style.width = '280px';
  textValid.style.fontSize = '36px';
  textValid.style.textAlign = 'center';
  modalbdy.prepend(textValid);
}

// affichage échec function 
function validationFailure() {
  console.log('nokk');

  /* console.log(errors); */

  for (let prop in form) {
    if (form[prop].parentNode.hasAttribute("data-error")) {
      form[prop].parentNode.removeAttribute("data-error");
      form[prop].parentNode.removeAttribute("data-error-visible");
    }
    errors.forEach(err => {
      if (err == prop) {
        // ajouter l'attribut d'erreur et le text error
        form[prop].parentNode.setAttribute("data-error", errorText[prop]);
        form[prop].parentNode.setAttribute("data-error-visible", "true");
      }
    })
  }

}

