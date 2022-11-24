// This file is a functions library. It store all functions needed to run the project

/**
 * This function store the searchParams method of the current url into "currentURLparams" variable
 * To know how to get the current url, please read this documentation: https://developer.mozilla.org/en-US/docs/Web/API/URL/href#examples
 * To know how to use the searchParams.get method in order to get the current id of the product
 * please read this documentation: https://developer.mozilla.org/fr/docs/Web/API/URL/searchParams#exemples
 * @function
 */
export function getCurrentId() {
  let currentUrlParams = new URL(document.location).searchParams;
  //   let currentId = params.get("id");
  return currentUrlParams.get("id");
}

/**
 * This function check all inputs selected by users before just before sending it into the local storage
 * If inputs are ok, this function create the "productOrdered" Object and call the addToBasket function
 * @function
 */

export function validOrder() {
  let productQuantity = parseFloat(document.getElementById("quantity").value);
  let colorSelected = document.getElementById("colors").value;
  console.log(typeof(productQuantity))
  console.log(Number.isInteger(productQuantity))
  if (colorSelected != "" && productQuantity > 0 && productQuantity <= 100 && Number.isInteger(productQuantity)) {
    let productOrdered = {
      idOfProduct: getCurrentId(),
      quantityOfProduct: parseInt(productQuantity),
      colorOfProduct: colorSelected,
    };
    console.table(productOrdered);
    addToBasket(productOrdered);
    alert(`Votre produit à été ajouté au panier`);
  } else {
    alert("Bonjour, Veuillez choisir une couleur et/ou une quantité valide.");
  }
}

/**
 * This function stringify the parameter in order to send it into the localstorage
 * Before sending it into the local storage, a check will be done with the .find function
 * To know more about the local storage please read this documentation: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/find, https://tutowebdesign.com/localstorage-javascript.php and https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage
 * @function
 * @param {Object} productOrdered
 */

function addToBasket(productOrdered) {
  let basket = JSON.parse(localStorage.getItem("basket"));
  if (basket === null) {
    basket = [];
  }
  let checkBasket = basket.find(
    (product) =>
      product.idOfProduct === productOrdered.idOfProduct &&
      product.colorOfProduct === productOrdered.colorOfProduct
  );
  if (checkBasket) {
    checkBasket.quantityOfProduct += productOrdered.quantityOfProduct;
  } else {
    basket.push(productOrdered);
  }
  window.localStorage.setItem("basket", JSON.stringify(basket));
}


/**
 * This function listen the changes made into the input "itemQuantity", verify if the quantity is between 1 and 100 and compare the id and color with product in localstorage.
 * If the product is find into the local storage, the quantities are valids, the new quantity is save into the basket;
 * To know more about the local storage please read this documentation: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/find, https://tutowebdesign.com/localstorage-javascript.php and https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage
 * Please read this documentation : https://developer.mozilla.org/fr/docs/Web/API/Element/closest and https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 * @function
 */
export function changedQty() {
  let basket = JSON.parse(localStorage.getItem("basket"));
  document.querySelectorAll(".itemQuantity").forEach((itemQuantity) => {
    itemQuantity.addEventListener("change", function (event) {
      if (event.target.value <= 100 && event.target.value > 0) {
        const currentId = itemQuantity
          .closest(".cart__item")
          .getAttribute("data-id");
        const currentColor = itemQuantity
          .closest(".cart__item")
          .getAttribute("data-color");
        const newQuantity = basket.find(
          (product) =>
            product.idOfProduct == currentId &&
            product.colorOfProduct == currentColor
        );
        newQuantity.quantityOfProduct = +event.target.value;
        if (Number.isInteger(newQuantity.quantityOfProduct)) {
          localStorage.setItem("basket", JSON.stringify(basket));
          location.reload();
        } else {
          alert(
            "Merci de renseigner des quantités valides. Seuls les nombres entiers sont acceptés. "
          );
        }
      } else {
        alert(
          "Merci de renseigner des quantités valides. Seuls les quantités entre 1 et 100 sont acceptés."
        );
      }
    });
  });
}


/**
 * this function listen the click on "delete" element. Onclick, it will return a new array without the product deleted
 * Please read this documentation : https://developer.mozilla.org/fr/docs/Web/API/Element/closest and https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 * @function
 */
export function deleteProduct() {
  let basket = JSON.parse(localStorage.getItem("basket"));
  document.querySelectorAll(".deleteItem").forEach((deleteItem) => {
    deleteItem.addEventListener("click", () => {
      const currentId = deleteItem
        .closest(".cart__item")
        .getAttribute("data-id");
      const currentColor = deleteItem
        .closest(".cart__item")
        .getAttribute("data-color");
      let ProductToDelete = currentId + currentColor
      basket = basket.filter(
        (product) =>
          product.idOfProduct +product.colorOfProduct != ProductToDelete
      );
      localStorage.setItem("basket", JSON.stringify(basket));
      location.reload();
    });
  });
}
