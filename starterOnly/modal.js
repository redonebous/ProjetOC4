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
const textFormFirst = document.querySelector("#first");
const textFormLast = document.querySelector("#last");
const emailForm = document.querySelector("#email");
const birthForm = document.querySelector("#birthdate");
const quantityForm = document.querySelector("#quantity");
// Checkbox in form
const loc1Form = document.querySelector("#location1");
const loc2Form = document.querySelector("#location2");
const loc3Form = document.querySelector("#location3");
const loc4Form = document.querySelector("#location4");
const loc5Form = document.querySelector("#location5");
const loc6Form = document.querySelector("#location6");
const labelRadio = document.querySelector(".text-label");
const checkbox1 = document.querySelector('#checkbox1');



// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalClose.addEventListener("click", closeModal);


// completion control of the form before submit
formReserve.addEventListener("submit", (e) => {
  e.preventDefault();

  let ctrlTextForm = (textFormFirst.value.length > 2 && textFormLast.value.length > 2);
  let ctrlMailForm = emailForm.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  let ctrlBirthForm = birthForm.value != '';
  let ctrlQuantityForm = quantityForm.value != '';
  let ctrlRadioLocForm = (loc1Form.checked || loc2Form.checked || loc3Form.checked || loc4Form.checked || loc5Form.checked || loc6Form.checked);
  let ctrlCheckbox = checkbox1.checked;

  /* let ctrlRadioLocForm2 = ; */

  /* ctrlTextForm && ctrlMailForm && ctrlBirthForm && ctrlQuantityForm && ctrlRadioLocForm && */

  if (ctrlCheckbox) {
    // Affichage message réussite
    validationSuccess();
  } else {
    // Affichage message échec
    validationFailure();
  }

})

subBtn.addEventListener('click', () => {
  if (subBtn.classList.contains('btn-sub-close')) {
    let textValid = document.querySelector('.text-valid-form');
    textValid.remove();
    formData.forEach((formData) => {
      formData.style.visibility = 'visible';
      formData.style.opacity = 1;
    });
    labelRadio.style.visibility = 'visible';
    labelRadio.style.opacity = 1;
    formReserve.submit();
    closeModal();
  }

})

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal function
function closeModal() {
  modalbg.style.display = "none";
}

// Affichage réussite function 
function validationSuccess() {
  console.log('ok');

  // Masquer le form
  formData.forEach((formData) => {
    formData.style.visibility = 'hidden';
    formData.style.opacity = 0;
  });
  labelRadio.style.visibility = 'hidden';
  labelRadio.style.opacity = 0;

  textValidationForm();

  // Changer le text du btn + 
  subBtn.value = 'Fermer';
  subBtn.classList.toggle('btn-sub-close');
}

// affichage échec function 
function validationFailure() {

  console.log('nokk');
}


// Faire apparaitre le text de validation
function textValidationForm() {
  let textValid = document.createElement('p');
  textValid.classList.add('text-valid-form');
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
