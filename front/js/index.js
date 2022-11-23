import { fetchProducts } from "./utils/dataApiManager.js";
import { displayProducts } from "./utils/displayConfig.js";

/**
 *  * This variable store the promese from our fetch
 * Then we get the json data from the api and displayed the data on the screen
 * please read this documentation https://developer.mozilla.org/fr/docs/Learn/JavaScript/Asynchronous/Promises#async_et_await
 */

const jsonProducts_promese = fetchProducts();
jsonProducts_promese.then((json) => displayProducts(json));
