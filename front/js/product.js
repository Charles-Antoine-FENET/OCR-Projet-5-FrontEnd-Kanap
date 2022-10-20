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
  .then(function (dataProduct) {
    function creatProduct() {
      // Initialisation des éléments à creer dans le DOM
      let newImg = document.createElement("img");
      newImg.setAttribute("src", dataProduct.imageUrl);
      newImg.setAttribute("alt", dataProduct.altTxt);
      console.log(newImg);

      //   Positionnement sur l'élément qui va recevoir les nouveaux éléments
      let getItemImg = document.querySelector(".item__img");

      //   Ajoût l'image à la div "item__img"
      getItemImg.appendChild(newImg);

      // Renseigner les balises avec les data du fetch
      document.getElementById("title").textContent = dataProduct.name;
      document.getElementById("price").textContent = dataProduct.price;
      document.getElementById("description").textContent = dataProduct.description;

    //   for(colorChoice in dataProduct.colors){
    //     // Initialisation des éléments à creer dans le DOM
    //     let colorOption = document.get

    //     // Positionnement sur l'élément qui va recevoir les nouveaux éléments

    //     // ajoût du choix possible
    //   }
    }
    creatProduct(dataProduct);
  });
