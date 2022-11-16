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
  .then((jsApiData) => displayProductPage(jsApiData));

// Création de la fonction qui va creer les éléments nécessaires à la page
function displayProductPage(apiDataProduct) {
  let getItemImg = document.querySelector(".item__img");
  getItemImg.innerHTML = `<img src=${apiDataProduct.imageUrl} alt=${apiDataProduct.altTxt}>`;
  document.getElementById("title").textContent = apiDataProduct.name;
  document.getElementById("price").textContent = apiDataProduct.price;
  document.getElementById("description").textContent = apiDataProduct.description;

  // Creation des choix multiples
  for (colorChoice of apiDataProduct.colors) {
    console.log(apiDataProduct.colors[colorChoice]);
    // Initialisation des éléments à creer dans le DOM
    function creatColorChoices() {
      let colorOption = document.createElement("option"); // Création du choix de couleur
      document.getElementById("colors").appendChild(colorOption); //positionnement sur l'élément parent et intégration des éléments enfants
      colorOption.setAttribute = ("value", colorChoice); // Ajoût des attributs "value" a chaque iteration de la boucle et callback sur la couleur de l'iteration.
      colorOption.innerText = colorChoice; // Intégration de la couleur que l'itération aura donnée, dans la balise html
    }
    creatColorChoices(apiDataProduct.colors[colorChoice]); //execution de la creation des elements dans ma boucle
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
        quantityOfProduct: parseInt(productQuantity),
        colorOfProduct: colorSelected,
      };
      console.table(productOrdered);
      addToBasket(productOrdered);
      alert(`Votre produit à été ajouté au panier`)
    } else {
      alert(
        "Bonjour, Veuillez choisir choisir une couleur et/ou une quantité valide."
      );
    }
  });
}
getProductOrdered();

function addToBasket(productOrdered) {

  let basket = JSON.parse(localStorage.getItem("basket"));
  console.log("Apperçu du panier", basket);
  if (basket == null) {
    basket = [];
    console.log("Initialisation d'un panier car il n'y en avait pas", basket);
  }
  let checkBasket = basket.find(product => product.idOfProduct == productOrdered.idOfProduct && product.colorOfProduct == productOrdered.colorOfProduct)
  if(checkBasket){
    checkBasket.quantityOfProduct += productOrdered.quantityOfProduct;
  }else{
    basket.push(productOrdered);
  }
  window.localStorage.setItem("basket", JSON.stringify(basket));
  // envoyer l'id order dans l'adress et l'afficher dans un l'html
}

// Zone d'archive du dirty code.

// fetch("http://localhost:3000/api/products/" + currentId)
//   .then(function (apiProductsResult) {
//     if (apiProductsResult.ok) {
//       return apiProductsResult.json();
//     }
//   })
//   .then(function (apiDataProduct) {
//     function creatProduct() {
//       // Initialisation des éléments à creer dans le DOM
//       let newImg = document.createElement("img");
//       newImg.setAttribute("src", apiDataProduct.imageUrl);
//       newImg.setAttribute("alt", apiDataProduct.altTxt);
//       console.log(newImg);

//       //   Positionnement sur l'élément qui va recevoir les nouveaux éléments
//       let getItemImg = document.querySelector(".item__img");

//       //   Ajoût l'image à la div "item__img"
//       getItemImg.appendChild(newImg);

//       // Renseigner les balises avec les data du fetch
//       document.getElementById("title").textContent = apiDataProduct.name;
//       document.getElementById("price").textContent = apiDataProduct.price;
//       document.getElementById("description").textContent =
//         apiDataProduct.description;

//       //   Creation des choix multiples
//       for (colorChoice of apiDataProduct.colors) {
//         console.log(apiDataProduct.colors[colorChoice]);
//         // Initialisation des éléments à creer dans le DOM
//         function creatColorChoices() {
//           let colorOption = document.createElement("option"); // Création du choix de couleur
//           document.getElementById("colors").appendChild(colorOption); //positionnement sur l'élément parent et intégration des éléments enfants
//           colorOption.setAttribute = ("value", colorChoice); // Ajoût des attributs "value" a chaque iteration de la boucle et callback sur la couleur de l'iteration.
//           colorOption.innerText = colorChoice; // Intégration de la couleur que l'itération aura donnée, dans la balise html
//         }
//         creatColorChoices(apiDataProduct.colors[colorChoice]); //execution de la creation des elements dans ma boucle

//         // Positionnement sur l'élément qui va recevoir les nouveaux éléments

//         // ajoût du choix possible2
//       }
//     }
//     creatProduct(apiDataProduct);
//   });
