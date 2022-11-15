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

// Modal 
const modalClose = document.querySelector(".close");
const subBtn = document.querySelector(".btn-submit");
// Form in modal
const textFormFirst = document.querySelector("#first");
const textFormLast = document.querySelector("#last");
const emailForm = document.querySelector("#email");
const birthForm = document.querySelector("#birthdate");
const quantityForm = document.querySelector("#quantity");

const loc1Form = document.querySelector("#location1");
const loc2Form = document.querySelector("#location2");
const loc3Form = document.querySelector("#location3");
const loc4Form = document.querySelector("#location4");
const loc5Form = document.querySelector("#location5");
const loc6Form = document.querySelector("#location6");

const checkbox1 = document.querySelector('#checkbox1');


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalClose.addEventListener("click", closeModal);


// completion control of the form before submit
subBtn.addEventListener("click", (e) => {

  let ctrlTextForm = (textFormFirst.value.length > 2 && textFormLast.value.length > 2);
  let ctrlMailForm = emailForm.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  let ctrlBirthForm = birthForm.value != '';
  let ctrlQuantityForm = quantityForm.value != '';
  let ctrlRadioLocForm = (loc1Form.checked || loc2Form.checked || loc3Form.checked || loc4Form.checked || loc5Form.checked || loc6Form.checked);
  let ctrlCheckbox = checkbox1.checked;

  if (ctrlTextForm && ctrlMailForm && ctrlBirthForm && ctrlQuantityForm && ctrlRadioLocForm && ctrlCheckbox) {
    // Affichage message réussite
  } else {
    e.preventDefault();
    console.log('nok');
    // Affichage message réussite
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


