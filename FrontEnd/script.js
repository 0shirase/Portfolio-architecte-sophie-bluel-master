const gallery = document.querySelector('.gallery');
const filters = document.querySelector(".filters");

async function main () {
    displayWorks ();
    displayfilters ();
    admin();
    hideFilterButtons();
    createModalButton();
}

main();

/***appel de l'API***/

/**works **/
async function getWorks () {
    try {
        const worksResponse = await fetch ("http://localhost:5678/api/works");
        return worksResponse.json();
    }
    catch (error) {
        console.log("Erreur durant la récupération des projets dans l'API")
    }
}

/**category**/
async function getCategories () {
    
    try {
        const categoriesResponse = await fetch ("http://localhost:5678/api/categories");
        return categoriesResponse.json();
    }
    catch (error) {
        console.log("Erreur durant la récupération des catégories dans l'API")
    }
}
/***Affichage dynamique de la gallery***/
async function displayWorks(categorieId) {

try {
    const dataworks = await getWorks();
    gallery.innerHTML = "";

    dataworks.forEach((works) => {
        if (categorieId == works.category.id || categorieId == null) {
            createWorks(works);
        }
    });
} 
    catch (error) {
        console.log("Erreur durant l'affichage des projets")
    }
}

/***Création des projets dans la gallery***/
function createWorks(works) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = works.imageUrl;
    figcaption.innerText = works.title;
    figure.setAttribute("categorieId", works.category.id);

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
} 

function createFilter(category) {
    const btnCategorie = document.createElement("button");
    btnCategorie.innerText = category.name;
    btnCategorie.setAttribute("class", "btnfilter");
    btnCategorie.setAttribute("buttonID", category.id);
    filters.appendChild(btnCategorie);
} 

async function displayfilters() {
    const dataCategories = await getCategories();
    

    dataCategories.forEach((category) => {
        
        createFilter(category)
        
    });

    const allButtons = document.querySelectorAll('.btnfilter');

    allButtons.forEach((btnCategorie) => {
        
        /**event listener pour les btn**/
        btnCategorie.addEventListener('click', function() {
            
            let categoryId = btnCategorie.getAttribute("buttonID");

            /**suppression de la classe 'selected'**/
        
            allButtons.forEach(button => button.classList.remove('selected'));
        
            /**Ajout de la classe 'selected' uniquement sur le btn sélectionné**/
            btnCategorie.classList.add('selected');
            
            /**Affichage des works suivant la catégorie**/
            displayWorks(categoryId);
        });
        
    });

   
}

/**Vérification de la connexion sur index.html**/
    function admin() {
    const loginLink = document.getElementById("login");
    const logoutLink = document.getElementById("logout");

    const token = sessionStorage.getItem("token"); 
    if (token) {
        loginLink.style.display = "none";
        logoutLink.style.display = "block";

        /**Gestionnaire d'événement pour la déconnexion**/
        logoutLink.addEventListener("click", function() {
            sessionStorage.removeItem("token"); 
            window.location.href = "./index.html"; 
        });

        /*Création de la bannière*/
const blackBanner = document.createElement('div');
blackBanner.style.backgroundColor = 'black';
blackBanner.style.width = '100%';
blackBanner.style.height = '40px'; 
blackBanner.style.display = 'flex';
blackBanner.style.justifyContent = 'center';
blackBanner.style.alignItems = 'center';
blackBanner.style.color = 'white';

/*Création du span pour l'icône et le texte*/
const iconTextContainer = document.createElement('span');
iconTextContainer.style.display = 'flex';
iconTextContainer.style.alignItems = 'center';
/*Création de l'icône crayon*/

const icon = document.createElement('i');
icon.classList.add('fas', 'fa-pen-to-square');
icon.style.marginRight = '5px'; 
iconTextContainer.appendChild(icon);

/*Création du texte*/
const textNode = document.createTextNode('Mode édition');
iconTextContainer.appendChild(textNode);

/*Ajout du span à l'intérieur de la bannière*/
blackBanner.appendChild(iconTextContainer);

/*Ajout de la bannière noire à l'élément banner*/
banner.appendChild(blackBanner);

/*Fonction pour créer le bouton modal*/
function createModalButton() {

    const modalButton = document.createElement("button");
    modalButton.innerText = "Ouvrir la fenêtre modale";
    modalButton.setAttribute("id", "modalButton");
    modalButton.style.marginBottom = "10px"; 
    filters.appendChild(modalButton);

    /*Event listener de la fenêtre modal*/
    modalButton.addEventListener('click', openModal);
}

/*Fonction pour afficher la fenêtre modale*/
function openModal() {
    
}

/*Fonction pour masquer les boutons de filtre si l'utilisateur est connecté et afficher le bouton modal*/
function hideFilterButtons() {
    const filterButtons = document.querySelectorAll('.btnfilter');
    const isAdmin = admin(); 

    if (isAdmin) {
        filterButtons.forEach(button => {
            button.style.display = 'none'; 
        });
    }
}

    } else {
        loginLink.style.display = "block";
        logoutLink.style.display = "none";
    }
};

