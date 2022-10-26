console.log("script.js connecté !!");

// Appel à l'API via la fonction fetch
fetch("http://localhost:3000/api/products")

// On recupère la promesse dans un fichier json avec la fonction asynchrone .then
.then(function (apiProductsResult) {
  if (apiProductsResult.ok) {
    return apiProductsResult.json();
  }
})
// On donne le nom "jsonData" aux données que la promesse nous retourne. 
// Puis on appel la fonction display en lui donnant en argument
// les données que l'api nous a retourné.
.then((jsonData) => display(jsonData)); 

// Création d'une fonction "display" qui a pour but d'être invoquée sur la réponse de l'API
function display(dataProducts) {
  // Positionnement sur l'élément parent à ceux que nous devons créer.
  let getSectionItems = document.getElementById("items");
  
  // Création d'une boucle qui va parcourir "jsonData" et creer des éléments à chaque itération.
  for (product of dataProducts) {
    // Initialisation des éléments que nous devons créer
    let newLink = document.createElement("a");
    let newArticle = document.createElement("article");
    
    // Création du contenu et des attributs nécessaires pour les éléments
    newLink.setAttribute("href", `./product.html?id=${product._id}`);
    newArticle.innerHTML =
    `<img src=${product.imageUrl} alt=${product.altTxt}><h3 class='productName'>${product.name}</h3><p class='productDescription'>${product.description}</p>`;
    
    
    // Ajoût des éléments dans le DOM
    newLink.appendChild(newArticle);
    getSectionItems.appendChild(newLink);
  }
}



// Zone d'ariche des méthodes que j'ai pu tester mais que je n'ai pas retenu.

// fetch("http://localhost:3000/api/products")
//   .then(function (apiProductsResult) {
//     if (apiProductsResult.ok) {
//       return apiProductsResult.json();
//     }
//   })
//   //   Récuperation de la réponse émise par l'API dans la fonction que je nomme "dataProducts"
//   //   Puis creation d'une boucle qui va lire chaque instance de l'objet "produit" qui est disponible sur le serveur
//   //   dataProduct récupère et contient donc les résultats de l'api. getProduct est créé comme itération de la boucle for et va lire dans dans dataProduct ligne par ligne
//   .then(function (dataProducts) {
//     for (let getProduct in dataProducts) {
//       function creatProduct() {
//         // Initialisation des éléments à creer dans le DOM
//         let newLink = document.createElement("a");
//         let newArticle = document.createElement("article");
//         let newImg = document.createElement("img");
//         let newProductName = document.createElement("h3");
//         let newProductDescription = document.createElement("p");

//         //   Positionnement sur l'élément qui va recevoir les nouveaux éléments
//         let getSectionItems = document.getElementById("items");

//         //   Ajoût du lien dans l'élément
//         getSectionItems.appendChild(newLink);
//         newLink.setAttribute("href", `./product.html?id=${dataProducts[getProduct]._id}`);

//         //   Ajoût de l'article dans le lien
//         newLink.appendChild(newArticle);

//         //   Ajoût de l'img dans l'article
//         newArticle.appendChild(newImg);
//         newImg.setAttribute("src", dataProducts[getProduct].imageUrl);
//         newImg.setAttribute("alt", dataProducts[getProduct].altTxt);

//         //   Ajoût de titre du nouveau produit dans l'article
//         newArticle.appendChild(newProductName);
//         newProductName.classList.add("productName");
//         newProductName.innerHTML = dataProducts[getProduct].name;

//         //   Ajoût de la description du nouveau produit dans l'article
//         newArticle.appendChild(newProductDescription);
//         newProductDescription.classList.add("productDescription");
//         newProductDescription.innerHTML = dataProducts[getProduct].description;
//       }
//       creatProduct(dataProducts[getProduct]);
//     }
//   })
//   .catch(function (err) {
//     // Une erreur est survenue
//   });

  // On recupère via un second .then les données de la réponse de la promesse de l'API. 