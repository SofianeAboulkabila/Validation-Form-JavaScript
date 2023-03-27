var iframeActif = null; // l'iframe actuellement affiché

function afficherPrevisualisation(url) {
  // Trouver l'élément .gruge pour insérer l'iframe en dessous
  var gruge = document.querySelector(".gruge[data-url='" + url + "']");

  // Si une iframe est déjà affichée pour cet élément, désactiver l'affichage
  if (gruge.classList.contains("actif")) {
    gruge.classList.remove("actif");
    if (iframeActif !== null) {
      iframeActif.parentNode.removeChild(iframeActif);
      iframeActif = null;
    }
    return;
  }
  
  // Si une iframe est déjà affichée pour un autre élément, la supprimer
  if (iframeActif !== null) {
    iframeActif.parentNode.removeChild(iframeActif);
    grugeActif = document.querySelector(".gruge.actif");
    if (grugeActif !== null) {
      grugeActif.classList.remove("actif");
    }
  }

  // Créer un iframe pour afficher la page Web
  var iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.style.width = "50%";
  iframe.style.height = "600px";
  iframe.style.border = "1px solid #ccc";
  iframe.style.display = "block";
  iframe.style.margin = "30px auto -170px auto";
  
  // Créer un élément div pour contenir l'iframe
  var div = document.createElement("div");
  div.style.position = "relative";
  div.appendChild(iframe);

  // Insérer l'élément div en dessous du tableau
  var tableau = document.querySelector("table");
  tableau.parentNode.insertBefore(div, tableau.nextSibling);
  
  // Définir l'iframe affichée comme étant l'iframe que nous venons de créer
  iframeActif = iframe;
  
  // Ajouter la classe "actif" à l'élément .gruge
  gruge.classList.add("actif");
}

// Ajouter un gestionnaire d'événement de clic à tous les éléments avec la classe .gruge
var elementsGruge = document.querySelectorAll(".gruge");
elementsGruge.forEach(function(gruge) {
  gruge.addEventListener("click", function() {
    var url = gruge.getAttribute("data-url");
    afficherPrevisualisation(url);
  });
});

// Ajouter un gestionnaire d'événement pour désactiver l'affichage de l'iframe en cas de clic en dehors de celle-ci
document.addEventListener("click", function(event) {
  var elementClique = event.target;
  if (!elementClique.classList.contains("gruge") && !elementClique.closest("div[data-url]")) {
    var grugeActif = document.querySelector(".gruge.actif");
    if (grugeActif !== null) {
      grugeActif.classList.remove("actif");
      if (iframeActif !== null) {
        iframeActif.parentNode.removeChild(iframeActif);
        iframeActif = null;
      }
    }
  }
});
