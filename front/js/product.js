import { fetchOneProduct } from "./utils/dataApiManager.js";
import { displayOneProduct } from "./utils/displayConfig.js";
import { getCurrentId, validOrder } from "./Utils/fxLibrary.js";

const jsonOneProduct_promese = fetchOneProduct(getCurrentId());
console.log(jsonOneProduct_promese);

jsonOneProduct_promese.then((json) => displayOneProduct(json));
addToCart.addEventListener("click", () => {
  validOrder();
});
