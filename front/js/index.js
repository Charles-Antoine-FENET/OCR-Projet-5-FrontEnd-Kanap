import { fetchProducts } from "./utils/dataApiManager.js";
import { displayProducts } from "./utils/displayConfig.js";

/**
 *  * This variable store the promese from our fetch
 * please read this documentation https://developer.mozilla.org/fr/docs/Learn/JavaScript/Asynchronous/Promises#async_et_await
 */
const jsonProducts_promese = fetchProducts();


// Get the promese and increment datas into the function "displayProducts()" who creat html template.
jsonProducts_promese.then((json) => displayProducts(json));
