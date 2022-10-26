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
    let addToCart = document.getElementById("addToCart");
    let productQuantity = document.getElementById("quantity").value;
    console.log(productQuantity);
    let colorSelected = document.getElementById("colors").value;
    console.log(colorSelected);
    if (colorSelected != "" && productQuantity > 0 && productQuantity <= 100) {
      console.log("color selected and quantity valid");
      let productOrdered = {
        idOfProduct: currentId,
        quantityOfProduct: productQuantity,
        colorOfProduct: colorSelected,
      };
      console.log(productOrdered);
    } else {
      alert(
        "Bonjour, Veuillez choisir choisir une couleur et/ou une quantité valide."
      );
    }
  });
}

// function getProductOrdered() {
//   let addToCart = document.getElementById("addToCart");
//   addToCart.addEventListener("click", function () {
//     if (productQuantity > 0 && productQuantity <= 100) {
//       let productQuantity = document.getElementById("quantity").value;
//       let colorChoice = document.getElementById("colors").value;
//       let productOrdered = {
//         idOfProduct: currentId,
//         quantityOfProduct: productQuantity,
//         colorOfProduct: colorChoice,
//       };
//     } else {
//       console.log("Tu ne peux pas faire cela!!!!");
//     }
//   });
// }

// // Création de la class panier
// class Basket {
//   constructor() {
//     //ici on va creer la génération du panier qui ensuite s'effectuera a chaque instance qui sera crée.
//     let basket = localStorage.getItem("basket"); //On recupérer l'item qui contient la clé que nous avons crée dans la fonction saveBasket
//     if (basket == null) {
//       this.basket = []; //on enregistre le resultat dans une propriété du basket
//     } else {
//       this.basket = JSON.parse(basket);
//     }
//   }
//   save() {
//     localStorage.setItem("basket", JSON.stringify(this.basket)); //Cela permet d'enregistrer dans le localStorage un ensemble clé valeur. Ici on a pour clé dans le locastorage "basket" qui contiendra les valeur de la variable basket (qui est le panier que nous souhaitons enregistrer)
//     // Une fois que c'est enregister, nous allons le retrouver dans le local storage
//   }
//   add(currentId) {
//     let foundProduct = this.basket.find((productId) => productId.id == currentId._id);
//     if (foundProduct != undefined) {
//       foundProduct.quantity++;
//     } else {
//       product.quantity = 1;
//       this.basket.push(product);
//     }
//     this.save();
//   }
//   remove(products) {
//     this.basket = this.basket.filter((p) => p.id != products.id);
//     this.save();
//   }
//   changeQuantity(products, quantity) {
//     let foundProduct = this.basket.find((p) => p.id == products.id);
//     if (foundProduct != undefined) {
//       foundProduct.quantity += quantity;
//       if (foundProduct.quantity <= 0) {
//         remove(foundProduct);
//       } else {
//         this.save();
//       }
//     }
//   }
//   getNumberProduct() {
//     let number = 0;
//     for (let product of this.basket) {
//       number += product.quantity;
//     }
//     return number;
//   }

//   getTotalPrice() {
//     let total = 0;
//     for (let product of this.basket) {
//       total += product.quantity * product.price;
//     }
//     return total;
//   }
// }

// let basketKanap = new Basket;
// console.log(basketKanap);
// basketKanap.add({"_id":"107fb5b75607497b96722bda5b504926"});

// Zone d'archive des test que j'ai pu faire et qui fonctionnent mais que je n'ai pas conservé.

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
