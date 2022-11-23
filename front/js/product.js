import { fetchOneProduct } from "./utils/dataApiManager.js";
import { displayOneProduct } from "./utils/displayConfig.js";
import { getCurrentId, validOrder } from "./Utils/fxLibrary.js";


/**
 *  * This variable store the promese from our fetch
 * please read this documentation https://developer.mozilla.org/fr/docs/Learn/JavaScript/Asynchronous/Promises#async_et_await
 * @const
 */
const jsonOneProduct_promese = fetchOneProduct(getCurrentId());

// Get the promese and increment datas into the function "displayProducts()" who creat html template.
jsonOneProduct_promese.then((json) => displayOneProduct(json));

// Listen the click and check if data are valids. if they are, the product is sent to the localstorage
addToCart.addEventListener("click", () => {
  validOrder();
});
