console.log("script.js connecté !!");

// 1/ Récuperrer les données de l'API>>> Creer une fonction qui récupère les data dans un variable

fetch("http://localhost:3000/api/products")
  .then(function (apiProductsResult) {
    if (apiProductsResult.ok) {
      return apiProductsResult.json();
    }
  })
  //   Récuperation de la réponse émise par l'API dans la fonction que je nomme "dataProducts"
  //   Puis creation d'une boucle qui va lire chaque instance de l'objet "produit" qui est disponible sur le serveur
  //   dataProduct récupère et contient donc les résultats de l'api. getProduct est créé comme itération de la boucle for et va lire dans dans dataProduct ligne par ligne
  .then(function (dataProducts) {
    for (let getProduct in dataProducts) {
      function creatProduct() {
        // Initialisation des éléments à creer dans le DOM
        let newLink = document.createElement("a");
        let newArticle = document.createElement("article");
        let newImg = document.createElement("img");
        let newProductName = document.createElement("h3");
        let newProductDescription = document.createElement("p");

        //   Positionnement sur l'élément qui va recevoir les nouveaux éléments
        let getSectionItems = document.getElementById("items");

        //   Ajoût du lien dans l'élément
        getSectionItems.appendChild(newLink);

        //   Ajoût de l'article dans le lien
        newLink.appendChild(newArticle);

        //   Ajoût de l'img dans l'article
        newArticle.appendChild(newImg);
        newImg.src = dataProducts[getProduct].imageUrl;
        newImg.alt = dataProducts[getProduct].altTxt;

        //   Ajoût de titre du nouveau produit dans l'article
        newArticle.appendChild(newProductName);
        newProductName.classList.add("productName");
        newProductName.innerHTML = dataProducts[getProduct].name;

        //   Ajoût de la description du nouveau produit dans l'article
        newArticle.appendChild(newProductDescription);
        newProductDescription.classList.add("productDescription");
        newProductDescription.innerHTML = dataProducts[getProduct].description;
      }
      creatProduct(dataProducts[getProduct]);
    }
  })
  .catch(function (err) {
    // Une erreur est survenue
  });

// function creatNewProduct() {
//   // Initialisation des éléments à creer dans le DOM
//   let newLink = document.createElement("a");
//   let newArticle = document.createElement("article");
//   let newImg = document.createElement("img");
//   let newProductName = document.createElement("h3");
//   let newProductDescription = document.createElement("p");
//   //   Ajoût des nouveaux éléments à la balise id "items"
//   let getSectionItems = document.getElementById("items");
//   getSectionItems.appendChild(newLink);
//   console.log("Lien ajouté");
//   newLink.appendChild(newArticle);
//   console.log("Article ajouté en enfant du lien");
//   //   Modification du contenu de l'article avec la technique de string interpolation
//   newArticle.innerHTML = `<img=${getProduct.imageURL} alt =${getProduct.altTxt}> <h3 class"productName">${getProduct.name}</h3> <p class="productDescription">${getProduct.description}</p>`;
// }

// creatNewProduct();

// Créer un nouveau élément a chaque itération (creatElement)

// fetch("http://localhost:3000/api/products")
//   .then(function (res) {
//     if (res.ok) {
//       return res.json();
//     }
//   })
//   //   Récuperation de la réponse émise par l'API
//   .then(function (productList) {
//     console.log(productList);
//     console.log("Affichage de la requête validé!!!")
//   })
//   .catch(function (err) {
//     // Une erreur est survenue
//   });
