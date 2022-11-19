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

  let checkTextForm = (textFormFirst.value.length > 2 && textFormLast.value.length > 2);
  let checkMailForm = emailForm.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  let checkBirthForm = birthForm.value != '';
  let checkQuantityForm = quantityForm.value != '';
  let checkRadioLocForm = (loc1Form.checked || loc2Form.checked || loc3Form.checked || loc4Form.checked || loc5Form.checked || loc6Form.checked);
  let checkCheckbox = checkbox1.checked;


  if (checkTextForm && checkMailForm && checkBirthForm && checkQuantityForm && checkRadioLocForm && checkCheckbox) {
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

// close modal function
function closeModal() {
  if (subBtn.classList.contains('btn-sub-close')) {
    formReserve.submit();
  } else {
    modalbg.style.display = "none";
  }

}

// Affichage réussite function 
function validationSuccess() {
  // Masquer le form
  formData.forEach((formData) => {
    formData.style.visibility = 'hidden';
    formData.style.opacity = 0;
  });
  labelRadio.style.visibility = 'hidden';
  labelRadio.style.opacity = 0;

  messageValidation();

  // Changer le text du btn + add la classe btn-sub-close
  subBtn.value = 'Fermer';
  subBtn.classList.add('btn-sub-close');
}

// affichage échec function 
function validationFailure() {

  console.log('nokk');
}


// Faire apparaitre le text de validation
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
