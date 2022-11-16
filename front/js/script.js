// import { fetchProduct, displayProducts } from "./library.js";

/**
 *  * This variable store the promese from our fetch
 * Then we get the json data from the api and displayed the data on the screen
 * please read this documentation https://developer.mozilla.org/fr/docs/Learn/JavaScript/Asynchronous/Promises#async_et_await
 */
 const jsonProduct_promese = fetchProduct();
 jsonProduct_promese.then((json) => displayProducts(json));
 
 /**
  * This function call the api, ask the products list and get a promese
  * Please read this documentation https://developer.mozilla.org/fr/docs/Learn/JavaScript/Asynchronous/Promises#async_et_await
  * Please read this documentation https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5577591-recuperez-des-donnees-dun-service-web
  * @returns The product list is return in JSON
  */
 
 async function fetchProduct() {
   try {
     const response = await fetch("http://localhost:3000/api/products");
     if (!response.ok) {
       throw new Error(`Erreur HTTP: ${response.statut}`);
     }
     const json = await response.json();
     return json;
   } catch (error) {
     console.error(`Impossible d'obtenir les produits : ${error}`);
   }
 }
 
 /**
  * This function get the json data from the api and create html elements
  * in order to be displayed on screen when users load the index.html page.
  * Please read this documentation https://developer.mozilla.org/fr/docs/Web/API/Element/innerHTML
  * Please read this documentation https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5577491-modifiez-le-dom
  * To send and get the _id of the product into the product.html's url, please read the fallowing ressources:
  * https://developer.mozilla.org/fr/docs/Web/API/URLSearchParams and https://waytolearnx.com/2019/10/comment-recuperer-les-parametres-durl-en-javascript.html
  * @param {Object} dataFromApi
  */
 function creatHtmlElmt(dataFromApi){
     console.log(dataFromApi)
     document.getElementById("items").innerHTML +=
     `<a href="./product.html?id=${dataFromApi._id}">
     <article>
       <img src=${dataFromApi.imageUrl} alt=${dataFromApi.altTxt}>
       <h3 class="productName">${dataFromApi.name}</h3>
       <p class="productDescription">${dataFromApi.description}</p>
     </article>
   </a>`
 }
 
 /**
  * This function loop the Json array send from the api dans call creatHtmlElmt()
  * This will creat for each product a specific element into the hmtl and display the product on the screen
  * Please read this documentation https://openclassrooms.com/fr/courses/6175841-apprenez-a-programmer-avec-javascript/6279104-utilisez-la-bonne-boucle-pour-repeter-les-taches-for-while#/id/r-7179203
  * @param {Object} dataFromApi
  */
 function displayProducts(dataFromApi){
     for(product of dataFromApi){
         creatHtmlElmt(product)
     }
 }
