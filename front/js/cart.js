import { displayBasketProducts } from "./utils/displayConfig.js";
import {
  contact,
  firstNameInput,
  lastNameInput,
  addressInput,
  cityInput,
  emailInput,
  testFirstName,
  testLastName,
  testAdresse,
  testCity,
  testEmail,
} from "./utils/formManager.js";

import { produits, passOrder } from "./utils/dataApiManager.js";

console.log("cart.js connecté");

// Display product(s) ordered by users
displayBasketProducts();

// Test the formular before passing the order

firstNameInput.addEventListener("change", () => {
  testFirstName();
  console.log(contact);
});
lastNameInput.addEventListener("change", () => {
  testLastName();
  console.log(contact);
});
addressInput.addEventListener("change", () => {
  testAdresse();
  console.log(contact);
});
cityInput.addEventListener("change", () => {
  testCity();
  console.log(contact);
});
emailInput.addEventListener("change", () => {
  testEmail();
  console.log(contact);
});

// Push product ordered into the array "produits"

let basket = JSON.parse(localStorage.getItem("basket"));
basket.forEach((productOrdered) => {
  produits.push(productOrdered.idOfProduct);
});
console.log("voici mon tableau avec les id de prouduits: " + produits);

// Send to the API and redirect users to the confirmation.html page.
document
  .querySelector(".cart__order__form")
  .addEventListener("submit", passOrder);
