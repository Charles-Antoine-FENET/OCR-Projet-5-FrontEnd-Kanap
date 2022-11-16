
// Je n'arrive pas a utiliser les modules.
// Quand j'insert dans mon html le type "module" j'ai une erreur qui se produit dans la console.
// J'aimerais utilliser un fichier "library" pour stocker toutes mes fonctions et les appeler quand j'en ai besoin
// exemple pour la page index.html: j'aimerais simplement importer la promesse et les fonctions puis faire jsonProduct_promese.then((json) => displayProducts(json));
//  Normalement les fonctions vont faire le boulot sur ma promesse et afficher les produits. 
// Dans mon html, j'ai juste a importer mon script.js en mettant le type module. Le problème c'est que cela ne fonctionne pas.



/**
 * This function call the api, ask the products list and get a promese
 * @returns The product list is return in JSON
 */

 export async function fetchProduct() {
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
   * @param {Object} dataFromApi
   */
  export function creatHtmlElmt(dataFromApi) {
    console.log(dataFromApi);
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
   * This function loop the Json array send from the api dans call creatHtmlElmt()
   * This will creat for each product a specific element into the hmtl and display the product on the screen
   * @param {Object} dataFromApi
   */
  export function displayProducts(dataFromApi) {
    for (product of dataFromApi) {
      creatHtmlElmt(product);
    }
  }
  