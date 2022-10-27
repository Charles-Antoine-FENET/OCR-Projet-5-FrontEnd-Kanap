// check de la connection du script
console.log("product.js connecté !!");

// Récupération de l'url de la page
let currentUrl = new URL(window.location.href);
console.log(currentUrl);

// Récupération de l'id du produit
let currentId = currentUrl.searchParams.get("id");
console.log(currentId);

// Appel de l'API pour obtenir les informations concernant cette id

fetch("http://localhost:3000/api/products/" + currentId)
  .then(function (apiProductsResult) {
    if (apiProductsResult.ok) {
      return apiProductsResult.json();
    }
  })
  .then((jsonData) => displayProductPage(jsonData));

// Création de la fonction qui va creer les éléments nécessaire à la page
function displayProductPage(dataProduct) {
  let getItemImg = document.querySelector(".item__img");
  getItemImg.innerHTML = `<img src=${dataProduct.imageUrl} alt=${dataProduct.altTxt}>`;
  document.getElementById("title").textContent = dataProduct.name;
  document.getElementById("price").textContent = dataProduct.price;
  document.getElementById("description").textContent = dataProduct.description;

  // Creation des choix multiples
  for (colorChoice of dataProduct.colors) {
    console.log(dataProduct.colors[colorChoice]);
    // Initialisation des éléments à creer dans le DOM
    function creatColorChoices() {
      let colorOption = document.createElement("option"); // Création du choix de couleur
      document.getElementById("colors").appendChild(colorOption); //positionnement sur l'élément parent et intégration des éléments enfants
      colorOption.setAttribute = ("value", colorChoice); // Ajoût des attributs "value" a chaque iteration de la boucle et callback sur la couleur de l'iteration.
      colorOption.innerText = colorChoice; // Intégration de la couleur que l'itération aura donnée, dans la balise html
    }
    creatColorChoices(dataProduct.colors[colorChoice]); //execution de la creation des elements dans ma boucle
  }
}

function getProductOrdered() {
  addToCart.addEventListener("click", function controlInput() {
    let productQuantity = document.getElementById("quantity").value;
    let colorSelected = document.getElementById("colors").value;
    if (colorSelected != "" && productQuantity > 0 && productQuantity <= 100) {
      console.log("color selected and quantity valid");
      let productOrdered = {
        idOfProduct: currentId,
        quantityOfProduct: productQuantity,
        colorOfProduct: colorSelected,
      };
      console.table(productOrdered);
      // getBasket(productOrdered);
    } else {
      alert(
        "Bonjour, Veuillez choisir choisir une couleur et/ou une quantité valide."
      );
    }
  });
}
getProductOrdered();





// Zone d'archive du dirty code.

// fetch("http://localhost:3000/api/products/" + currentId)
//   .then(function (apiProductsResult) {
//     if (apiProductsResult.ok) {
//       return apiProductsResult.json();
//     }
//   })
//   .then(function (dataProduct) {
//     function creatProduct() {
//       // Initialisation des éléments à creer dans le DOM
//       let newImg = document.createElement("img");
//       newImg.setAttribute("src", dataProduct.imageUrl);
//       newImg.setAttribute("alt", dataProduct.altTxt);
//       console.log(newImg);

//       //   Positionnement sur l'élément qui va recevoir les nouveaux éléments
//       let getItemImg = document.querySelector(".item__img");

//       //   Ajoût l'image à la div "item__img"
//       getItemImg.appendChild(newImg);

//       // Renseigner les balises avec les data du fetch
//       document.getElementById("title").textContent = dataProduct.name;
//       document.getElementById("price").textContent = dataProduct.price;
//       document.getElementById("description").textContent =
//         dataProduct.description;

//       //   Creation des choix multiples
//       for (colorChoice of dataProduct.colors) {
//         console.log(dataProduct.colors[colorChoice]);
//         // Initialisation des éléments à creer dans le DOM
//         function creatColorChoices() {
//           let colorOption = document.createElement("option"); // Création du choix de couleur
//           document.getElementById("colors").appendChild(colorOption); //positionnement sur l'élément parent et intégration des éléments enfants
//           colorOption.setAttribute = ("value", colorChoice); // Ajoût des attributs "value" a chaque iteration de la boucle et callback sur la couleur de l'iteration.
//           colorOption.innerText = colorChoice; // Intégration de la couleur que l'itération aura donnée, dans la balise html
//         }
//         creatColorChoices(dataProduct.colors[colorChoice]); //execution de la creation des elements dans ma boucle

//         // Positionnement sur l'élément qui va recevoir les nouveaux éléments

//         // ajoût du choix possible2
//       }
//     }
//     creatProduct(dataProduct);
//   });
