import { getCurrentId } from "./Utils/fxLibrary.js";


// Get the html element, get the current id from the URL and increment into the html the data
document.getElementById("orderId").textContent=getCurrentId()
