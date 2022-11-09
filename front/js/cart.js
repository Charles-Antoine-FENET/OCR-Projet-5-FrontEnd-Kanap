// test de la connection
console.log("cart.js connecté !!");
// Création de la variable basket. Elle a pour but de recupérer et transformer en objet JS les éléments
// qui se trouvent dans le local storage sous la clé "basket"
let basket = JSON.parse(localStorage.getItem("basket"));
console.log(basket);
creatBasketProductList(basket);

// Création d'une fonction contenant une boucle qui va parcourir l'objet issu du local storage et creer puis renseigner les elements HTML
// Cette fonction doit être asynchrone car nous souhaitons attendre la réponse du serveur avant de lancer la création des éléments dans le Dom
// Sans l'async et l'await, les éléments crées risquent de se lancer avant la réponse du serveur et donc creer une erreur d'affichage.
async function creatBasketProductList() {


  // Création du tableau qui va contenir le prix total de chaque ligne de produits
  const total = [];


  // Création de l'itération "productOrdered" qui va parcourir le tableau "basket" qui est notre panier dans le local storage
  for (productOrdered in basket) {
    // Appel de l'API pour obtenir les informations produits
    let apiDataProducts = await fetch(
      "http://localhost:3000/api/products/" + basket[productOrdered].idOfProduct
    ).then(function (apiProductsResult) {
      if (apiProductsResult.ok) {
        return apiProductsResult.json();
      }
    });

    // Lancement de la création des éléments après avoir recu la réponse du serveur.
    // Positionnement sur l'élément HTML qui va recevoir les nouveaux éléments.
    let newArticle = document.createElement("article");

    // Stockage du prix total du produit commandé
    const totalPriceArticle = basket[productOrdered].quantityOfProduct * apiDataProducts.price;

    // Push du prix total du produit dans le tableau de stockage des prix totaux que nous avons créé 
    total.push(totalPriceArticle);

    // Utilisation de la fonction reduce pour calculer le total de la commande.
    const sum = (accumulateur, prices) => accumulateur + prices;
    const totalAll = total.reduce(sum);

    // intégration du resultat total des prix dans la balise HTML "totalPrice"
    document.getElementById("totalPrice").innerHTML += `${totalAll}`;

    // Création du reste des éléments HTML et implémentation des données de l'api et des données issues du localstorage et de notre boucle for
    newArticle.innerHTML = `
    <article class="cart__item" data-id="${
      basket[productOrdered].idOfProduct
    }" data-color="${basket[productOrdered].colorOfProduct}">
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
                    <input type="number" id="${basket[productOrdered].colorOfProduct + basket[productOrdered].idOfProduct}" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket[productOrdered].quantityOfProduct}">
                </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem" id="${basket[productOrdered].idOfProduct + basket[productOrdered].colorOfProduct}">Supprimer</p>
            </div>
        </div>
      </div>
    </article>
    `;
    document.getElementById("cart__items").appendChild(newArticle);
  }
  changedQty();
  deleteProduct();
}




// Création d'un fonction qui permet de modifier les quantités
// target va chercher la cible de la fonction
function changedQty() {
  // Stockage de l'input quantité dans la variable getQuantityChanged
  const getQuantityChanged = document.getElementsByClassName("itemQuantity");
  // Création d'une boucle itérative qui va écouter le changement de valeur de l'input et l'ajouter à la target puis mettre à jour les valeurs dans l'input et dans le local storage
  for (let i = 0; i < getQuantityChanged.length; i++) {
    const changeQuantity = getQuantityChanged[i];
    changeQuantity.addEventListener("change", function (e) {
      // Création de la fonction callback qui va vérifier les valeurs sont bonnes
      if (e.target.value <= 100 && e.target.value > 0) {
        // Si les valeurs sont bonnes alors on crée une variable "newQuantity" qui va chercher dans le panier version objet du local storage l'élément qui correspond au code id que nous avons crée (color suivi de l'id) et lui assigner la valeur de la target contenu dans changequantity
        // Pour cela un id a été ajouté dans le template au niveau de l'input. Cette id permet de créer un code spécial qui va concaténer la couleur+l'id du produit
        const newQuantity = basket.find(product => product.colorOfProduct + product.idOfProduct === changeQuantity.id);
        // on ajoute la nouvelle quantité contenue dans la function qui target(e) à quantityOfProduct
        newQuantity.quantityOfProduct =+ e.target.value;
        // on pousse les nouvelles données dans le local storage
        localStorage.setItem("basket", JSON.stringify(basket));
        // On demande à la page de se recharger pour prendre en compte à l'écran les dernières données.
        location.reload();
      } else {
        alert("Merci de verifier les quantités");
      }
    });
  }
}


// Création d'une fonction qui permet de supprimer un élément du panier

function deleteProduct() {
  const deleteItem = document.getElementsByClassName("deleteItem");
  for (let i = 0; i < deleteItem.length; i++) {
    const itemClass = deleteItem[i];
    itemClass.onclick = () => {
      basket = basket.filter(product => product.idOfProduct + product.colorOfProduct != itemClass.id);
      localStorage.setItem("basket", JSON.stringify(basket));
      location.reload();
    };
  }
}



//  GESTION DU FORMULAIRE


// Récupérer et analyser les données saisies par l’utilisateur dans le formulaire

// 1/ l'utilisateur va remplir les champs il faut donc mettre les test de valeur a ce niveau avec des REGEX (pas de nombre dans nom et prénom, @ obligatoire dans email)Si problème, message d'erreur dans le champs posant problème

// Stockage des regex
let validFirstName = /^[a-zA-Z\-]+$/g;
let validLastName = /^[a-zA-Z\-]+$/g;
let validAdress = /^[a-zA-Z\-\0-9]+$/g;
let validCity= /^[a-zA-Z\-]+$/g;
let validEmail= /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

// recupération et stockage des champs du formulaire

let firstNameInput = document.getElementById("firstName");
// Ecoute des changements qui sont fait sur les champs. console.log de ce qui a été mis dans le champs par l'utilisateur
firstNameInput.addEventListener('change', function(){
  console.log(firstNameInput.value);
  if(validFirstName.test(firstNameInput.value)){
    console.log("le test du prénom est validé")
    document.getElementById("firstNameErrorMsg").innerText="champ validé."

  }else{
    document.getElementById("firstNameErrorMsg").innerText="Prénom incorrect. Merci de ne pas utiliser de chiffres et caractères spéciaux."
  }
});
let lastNameInput = document.getElementById("lastName");
// Ecoute des changements qui sont fait sur les champs. console.log de ce qui a été mis dans le champs par l'utilisateur
lastNameInput.addEventListener('change', function(){
  console.log(lastNameInput.value);
  if(validLastName.test(lastNameInput.value)){
    console.log("le test du nom de famille est validé")
    document.getElementById("lastNameErrorMsg").innerText="champ validé."

  }else{
    document.getElementById("lastNameErrorMsg").innerText="Nom incorrect. Merci de ne pas utiliser de chiffres et caractères spéciaux."
  }
});
let adressInput = document.getElementById("address");
// Ecoute des changements qui sont fait sur les champs. console.log de ce qui a été mis dans le champs par l'utilisateur
adressInput.addEventListener('change', function(){
  console.log(adressInput.value);
  if(validAdress.test(adressInput.value)){
    console.log("le test de l'adresse est validé")
    document.getElementById("addressErrorMsg").innerText="champ validé."

  }else{
    document.getElementById("addressErrorMsg").innerText="Adresse incorrect. Merci de ne pas utiliser de caractères spéciaux."
  }
});
let cityInput = document.getElementById("city");
// Ecoute des changements qui sont fait sur les champs. console.log de ce qui a été mis dans le champs par l'utilisateur
cityInput.addEventListener('change', function(){
  if(validCity.test(cityInput.value)){
    console.log("le test de la ville est validé")
    document.getElementById("cityErrorMsg").innerText="champ validé."
  }else{
    document.getElementById("cityErrorMsg").innerText="Ville incorrect. Merci de ne pas utiliser de caractères spéciaux."
  }
});
let emailInput = document.getElementById("email");
// Ecoute des changements qui sont fait sur les champs. console.log de ce qui a été mis dans le champs par l'utilisateur
emailInput.addEventListener('change', function(){
  if(validEmail.test(emailInput.value)){
    console.log("le test de l'email est validé")
    document.getElementById("emailErrorMsg").innerText="champ validé."
  }else{
    document.getElementById("emailErrorMsg").innerText="email incorrect. exemple de mail valide : *****@****.fr"
  }
});




// 2/ l'utilisateur va cliquer sur le bouton "commander"
// 3/ l'event click sur le bouton va envoyer les informations à l'API
        // 3.1 Creer un objet "contact" qui contiendra toutes les données de la commande (firstName, lastName, adresse, city, email)
        // 3.2 Creer un tableau "produits" qui contient un id
        // 3.3 Stringify l'objet commande pour l'avoir au format JSON 
        // 3.4 Envoyer une requete POST à l'API qui contient le JSON de l'objet "commande".
        // 3.5 Redirection vers la page confirmation avec message de confirmation contenant l'id de la commande envoyé



// Afficher un message d’erreur si besoin (par exemple lorsqu’un utilisateur renseigne “bonjour” dans le champ “e-mail”).




// Constituer un objet contact (à partir des données du formulaire) et un tableau de produits.
