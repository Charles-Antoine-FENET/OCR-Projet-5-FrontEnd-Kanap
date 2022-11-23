// This file store all api function we need to get informations from api

/**
 * This function call the api, ask the products list and get a promese
 * Please read this documentation https://developer.mozilla.org/fr/docs/Learn/JavaScript/Asynchronous/Promises#async_et_await
 * Please read this documentation https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5577591-recuperez-des-donnees-dun-service-web
 * @returns The product list is return in JSON
 */

export async function fetchProducts() {
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
 *
 * this function need in argument the function call getCurrentId
 * then it return the promese from the api about only the product targeted by the current id
 * Please read this documentation https://developer.mozilla.org/fr/docs/Learn/JavaScript/Asynchronous/Promises#async_et_await
 * Please read this documentation https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5577591-recuperez-des-donnees-dun-service-web
 * @param {function} currentId
 * @returns {promese}
 */
export async function fetchOneProduct(currentId) {
  try {
    const response = await fetch(
      "http://localhost:3000/api/products/" + currentId
    );
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.statut}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(`Impossible d'obtenir les produits : ${error}`);
  }
}
