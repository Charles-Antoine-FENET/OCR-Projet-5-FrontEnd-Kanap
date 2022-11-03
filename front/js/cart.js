// test de la connection
console.log("cart.js connecté !!");

// Création de la variable basket. Elle a pour but de recupérer et transformer en objet JS les éléments
// qui se trouvent dans le local storage sous la clé "basket"
let basket = JSON.parse(localStorage.getItem("basket"));
console.log(basket);
creatBasketProductList(basket);

// Création d'une fonction contenant une boucle qui va parcourir l'objet issu du local storage et creer puis renseigner les elements HTML
// Cette fonction doit être asynchrone car nous souhaitons attendre la réponse du serveur avant de lancer la création des éléments dans le Dom
// Sans l'async et l'await, les éléments crées risquent de se lancer avance la réponse du serveur et donc creer une erreur d'affichage.
async function creatBasketProductList(productOrdered) {

    // Création de l'itération "productOrdered" qui va parcourir le tableau "basket" qui est notre panier dans le local storage
  for (productOrdered in basket) {

    // Appel de l'API pour obtenir les informations produits
    let apiDataProducts = await fetch("http://localhost:3000/api/products/" + basket[productOrdered].idOfProduct).then(
      function (apiProductsResult) {
        if (apiProductsResult.ok) {
          return apiProductsResult.json();
        }
      }
    );

    // Lancement de la création des éléments après avoir recu la réponse du serveur.
    // Positionnement sur l'élément HTML qui va recevoir les nouveaux éléments.
    let newArticle = document.createElement("article");
    newArticle.innerHTML = `
    <article class="cart__item" data-id="${basket[productOrdered].idOfProduct}" data-color="${basket[productOrdered].colorOfProduct}">
        <div class="cart__item__img">
        <img src=${apiDataProducts.imageUrl} alt=${apiDataProducts.altTxt}>
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${apiDataProducts.name}</h2>
                <p>${basket[productOrdered].colorOfProduct}</p>
                <p>${apiDataProducts.price}€</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté :</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket[productOrdered].quantityOfProduct}">
                </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
      </div>

    </article>
    `;
    document.getElementById("cart__items").appendChild(newArticle);
  }
}
