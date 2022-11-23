// this file store all functions needed to handle inputs from the formular

export let contact = {};
export let firstNameInput = document.getElementById("firstName");
export let lastNameInput = document.getElementById("lastName");
export let addressInput = document.getElementById("address");
export let cityInput = document.getElementById("city");
export let emailInput = document.getElementById("email");

export function testFirstName() {
  let validFirstName = /^[a-zA-Z\-]+$/g;
  if (validFirstName.test(firstNameInput.value)) {
    document.getElementById("firstNameErrorMsg").innerText = "champ validé.";
    contact.firstName = firstNameInput.value;
  } else {
    document.getElementById("firstNameErrorMsg").innerText =
      "Prénom incorrect. Merci de ne pas utiliser de chiffres et caractères spéciaux.";
  }
}
export function testLastName() {
  let validLastName = /^[a-zA-Z\-]+$/g;
  if (validLastName.test(lastNameInput.value)) {
    document.getElementById("lastNameErrorMsg").innerText = "champ validé.";
    contact.lastName = lastNameInput.value;
  } else {
    document.getElementById("lastNameErrorMsg").innerText =
      "Nom incorrect. Merci de ne pas utiliser de chiffres et caractères spéciaux.";
  }
}

export function testAdresse() {
  let validAdress = /^[a-zA-Z\-\0-9]+$/g;
  if (validAdress.test(addressInput.value)) {
    document.getElementById("addressErrorMsg").innerText = "champ validé.";
    contact.address = addressInput.value;
  } else {
    document.getElementById("addressErrorMsg").innerText =
      "Adresse incorrect. Merci de ne pas utiliser de caractères spéciaux.";
  }
}
export function testCity() {
  let validCity = /^[a-zA-Z\-]+$/g;
  if (validCity.test(cityInput.value)) {
    document.getElementById("cityErrorMsg").innerText = "champ validé.";
    contact.city = cityInput.value;
  } else {
    document.getElementById("cityErrorMsg").innerText =
      "Ville incorrect. Merci de ne pas utiliser de caractères spéciaux.";
  }
}
export function testEmail() {
  let validEmail =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if (validEmail.test(emailInput.value)) {
    document.getElementById("emailErrorMsg").innerText = "champ validé.";
    contact.email = emailInput.value;
  } else {
    document.getElementById("emailErrorMsg").innerText =
      "email incorrect. exemple de mail valide : *****@****.fr";
  }
}
