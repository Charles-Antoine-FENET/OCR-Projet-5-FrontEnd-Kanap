// This file store all TEMPLATEs we need to display information to the website
import { fetchOneProduct } from "./dataApiManager.js";
import { changedQty, deleteProduct } from "./fxLibrary.js";

/**
 * "TEMPLATE 1" for the index.html
 * This function get the json data from the api and create html elements in order to be displayed on screen when users load the index.html page.
 * Please read this documentation https://developer.mozilla.org/fr/docs/Web/API/Element/innerHTML
 * Please read this documentation https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5577491-modifiez-le-dom
 * To send and get the _id of the product into the product.html's url, please read the fallowing ressources:
 * https://developer.mozilla.org/fr/docs/Web/API/URLSearchParams and https://waytolearnx.com/2019/10/comment-recuperer-les-parametres-durl-en-javascript.html
 * @param {Object} dataFromApi
 */
export function templateOne(dataFromApi) {
  document.getElementById(
    "items"
  ).innerHTML += `<a href="./product.html?id=${dataFromApi._id}">
    <article>
      <img src=${dataFromApi.imageUrl} alt=${dataFromApi.altTxt}>
      <h3 class="productName">${dataFromApi.name}</h3>
      <p class="productDescription">${dataFromApi.description}</p>
    </article>
  </a>`;
}

/**
 * Used to display "TEMPLATE 1"
 * This function loop the Json array send from the api dans call templateOne()
 * This will creat for each product a specific element into the hmtl and display the product on the screen
 * Please read this documentation https://openclassrooms.com/fr/courses/6175841-apprenez-a-programmer-avec-javascript/6279104-utilisez-la-bonne-boucle-pour-repeter-les-taches-for-while#/id/r-7179203
 * @param {Object} dataFromApi
 */
export function displayProducts(dataFromApi) {
  for (let product of dataFromApi) {
    templateOne(product);
  }
}

/**
 * "TEMPLATE 2" for product.html
 * This function create the html element needed to display a card of the product.
 * It will add to the cardProduct : Picture, name, price and description of the product selected
 * @param {Object} dataFromApi
 */
export function templateTwo(dataFromApi) {
  let getItemImg = document.querySelector(".item__img");
  getItemImg.innerHTML = `<img src=${dataFromApi.imageUrl} alt=${dataFromApi.altTxt}>`;
  document.getElementById("title").textContent = dataFromApi.name;
  document.getElementById("price").textContent = dataFromApi.price;
  document.getElementById("description").textContent = dataFromApi.description;
}

/**
 * Used to add colors choices to "TEMPLATE 2"
 * This fonction get into the data fetched from the api the list of colors possible to order for the selected product
 * This function loop the array stored into the "colors" propety of the object fetched from the api.
 * To know more about the loop please read this documentation: https://openclassrooms.com/fr/courses/6175841-apprenez-a-programmer-avec-javascript/6279104-utilisez-la-bonne-boucle-pour-repeter-les-taches-for-while#/id/r-7179203
 * To know more about how creat html elements, please read this documentation : https://developer.mozilla.org/fr/docs/Web/API/Element/innerHTML and/or https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/innerText
 * @param {Object} dataFromApi
 */
export function addColorsList(dataFromApi) {
  for (let colorChoice of dataFromApi.colors) {
    function creatColorChoices() {
      let colorOption = document.createElement("option");
      document.getElementById("colors").appendChild(colorOption);
      colorOption.setAttribute = ("value", colorChoice);
      colorOption.innerText = colorChoice;
    }
    creatColorChoices(dataFromApi.colors[colorChoice]);
  }
}

/**
 * Used to display "TEMPLATE 2"
 * This function create the productcard and displayed it on screen
 * @param {Object} dataFromApi
 */
export function displayOneProduct(dataFromApi) {
  templateTwo(dataFromApi);
  addColorsList(dataFromApi);
}

/**
 * "TEMPLATE 3" for cart.html
 * This function get informations from a loop and create html elements.
 * Each iterations will creat a new element into the DOM in order to be display by calling displayBasketProducts() function
 * @param {Object} productOrdered. Itération from a loop
 * @param {Object} dataFromApi Itération of the object from the Api
 */
export function templateThree(productOrdered, dataFromApi) {
  document.getElementById(
    "cart__items"
  ).innerHTML += `<article class="cart__item" data-id=${
    productOrdered.idOfProduct
  } data-color=${productOrdered.colorOfProduct}>
      <div class="cart__item__img">
        <img src=${dataFromApi.imageUrl} alt=${dataFromApi.altTxt}>
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${dataFromApi.name}</h2>
          <p>${productOrdered.colorOfProduct}</p>
          <p>${dataFromApi.price}€</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" id="${
              productOrdered.colorOfProduct + productOrdered.idOfProduct
            }" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${
    productOrdered.quantityOfProduct
  }>
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem" id="${
              productOrdered.idOfProduct + productOrdered.colorOfProduct
            }">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
}

// /**
//  * This function get products from the localstorage, get the data from the API. Then, for each product ordered the function will create html element base on "TEMPLATE 3" by using templateThree
//  */
// export async function displayBasketProducts() {
//   let basket = JSON.parse(localStorage.getItem("basket"));
//   for (let productOrdered of basket) {
//     let productOrderedID = productOrdered.idOfProduct;
//     let dataFromApi = await fetchOneProduct(productOrderedID);
//     templateThree(productOrdered, dataFromApi);
//   }
// }

// zone de test

/**
 * those variables are used to store prices and quantities by product ordered
 * Those array will be used into "displayTotals()"" function
 * @const
 */
const total = [];
const totalQtyOrdered = [];

/**
 * This function get products from the localstorage, get the data from the API. Then, for each product ordered the function will create html element base on "TEMPLATE 3" by using templateThree
 */
export async function displayBasketProducts() {
  let basket = JSON.parse(localStorage.getItem("basket"));

  for (let productOrdered of basket) {
    let productOrderedID = productOrdered.idOfProduct;
    let dataFromApi = await fetchOneProduct(productOrderedID);
    const totalPriceArticle =
      productOrdered.quantityOfProduct * dataFromApi.price;
    const totalQtyArticle = productOrdered.quantityOfProduct;
    total.push(totalPriceArticle);
    totalQtyOrdered.push(totalQtyArticle);

    templateThree(productOrdered, dataFromApi);
  }
  displayTotals();
  changedQty();
  deleteProduct();
}

/**
 * This function calculate totals in order to be display into cart.html
 * "total" array and "totalQtyOrdered" array ared declared into the file "displayConfig.js"
 * @function
 */
function displayTotals() {
  const sum = (accumulateur, prices) => accumulateur + prices;
  const totalAll = total.reduce(sum);
  document.getElementById("totalPrice").innerHTML += `${totalAll}`;
  const sumQty = (accumulateur, qty) => accumulateur + qty;
  const totalAllQty = totalQtyOrdered.reduce(sumQty);
  document.getElementById("totalQuantity").innerHTML += `${totalAllQty}`;
}
