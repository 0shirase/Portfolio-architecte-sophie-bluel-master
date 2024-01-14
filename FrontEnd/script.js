const gallery = document.querySelector('.gallery');
const filters = document.querySelector(".filters");
const portfoliotitle = document.querySelector(".portfoliotitle");
const modal = document.querySelector('#modal1');

async function main() {
    displayWorks();
    displayfilters();
    admin();
    displayWorksInModal();
    closeModal();
}

main();

/***appel de l'API***/

/**works **/
async function getWorks() {
    try {
        const worksResponse = await fetch("http://localhost:5678/api/works");
        return worksResponse.json();
    }
    catch (error) {
        console.log("Erreur durant la récupération des projets dans l'API")
    }
}

/**category**/
async function getCategories() {

    try {
        const categoriesResponse = await fetch("http://localhost:5678/api/categories");
        return categoriesResponse.json();
    }
    catch (error) {
        console.log("Erreur durant la récupération des catégories dans l'API")
    }
}


/* fonction pour delete les works avec l'API */
async function deleteProject(projectId) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/1`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la suppression du projet');
        }
    } catch (error) {
        console.error(error.message);
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
        btnCategorie.addEventListener('click', function () {

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
        logoutLink.addEventListener("click", function () {
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

        /*zone filtre cachée*/
        filters.style.display = 'none';

     

/* selection du porfolio*/
const portfolioTitle = document.querySelector('.portfoliotitle');

/* création de la div pour l'icone et le texte */
const modifiedButton = document.createElement('div');
modifiedButton.classList.add('modified-button');

/* clone l'icone déjà crée */ 
const clonedIcon = icon.cloneNode(true); 

/* ajoute l'icone cloné à la div modifiedButton*/
modifiedButton.appendChild(clonedIcon);

/*création du texte modifié*/
const buttonText = document.createTextNode('Modifié');

/*ajoute le texte à la div modifiedButton*/
modifiedButton.appendChild(buttonText);

/* style pour le bouton modifié*/
modifiedButton.style.display = 'flex';
modifiedButton.style.alignItems = 'center';
modifiedButton.style.cursor = 'pointer';
modifiedButton.style.color = 'black';
modifiedButton.style.fontSize = '15px';

buttonText.parentNode.style.fontWeight = 'normal';


/*event listener pour ouvrir la modale*/
modifiedButton.addEventListener('click', openModal);

/*ajout de la div modifiedButton à la div portofoliotitle*/
portfolioTitle.appendChild(modifiedButton)
    } else {
        loginLink.style.display = "block";
        logoutLink.style.display = "none";
    }
};


/*Fonction pour ouvrir la fenêtre modale*/
function openModal() {
    const modal = document.querySelector('#modal1');
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
}
/* événement de clic pour le bouton "Modifié"*/
const modifiedButton = document.querySelector('.modified-button');
modifiedButton.addEventListener('click', openModal);

/*création du contenu de la fenêtre modale*/
const modalWrapper = document.querySelector('.modal-wrapper');

/* ajout des images pour la gallery modale*/
function createWorkElement(work) {
    const figure = document.createElement("figure");
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    const deleteIcon = document.createElement("button");

    img.src = work.imageUrl;
    img.classList.add('modal-image');

    imgContainer.appendChild(img);
    imgContainer.classList.add('img-container');

    deleteIcon.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteIcon.classList.add('delete-button');
    deleteIcon.style.fontWeight = 'normal';
    
    deleteIcon.addEventListener('click', async () => {
        if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
            await deleteProject(work.id);
            
        }
    });

    imgContainer.appendChild(deleteIcon);
    figure.appendChild(imgContainer);
    return figure;
}

/* Fonction pour afficher les works dans la fenêtre modale */
async function displayWorksInModal() {
    const modalWrapper = document.querySelector('.modal-wrapper');

    try {
        const dataWorks = await getWorks();


        /* Création de l'élément pour la croix de fermeture */
        const closeButton = document.createElement('span');
        closeButton.innerHTML = '&times;';
        closeButton.classList.add('close-button');

        /* Création de la div pour le titre et la croix */
        const titleAndCloseDiv = document.createElement('div');
        titleAndCloseDiv.classList.add('modal-title');
        titleAndCloseDiv.appendChild(closeButton);

        modalWrapper.appendChild(titleAndCloseDiv);

        /* eventlistener pour fermer la fenêtre modale en cliquant sur la croix */
        closeButton.addEventListener('click', closeModal);

        /* eventlistener pour la touche Échap qui permet de fermer la fenêtre modale */
        window.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });

        /* Ajout du titre "Galerie photo" à la nouvelle div */
        const galleryTitle = document.createElement('h3');
        galleryTitle.textContent = 'Galerie photo';
        galleryTitle.style.textAlign = 'center';

        titleAndCloseDiv.appendChild(galleryTitle);

        /* Création de la div pour les works */
        const worksDiv = document.createElement('div');
        worksDiv.classList.add('works-modal');

        dataWorks.forEach((work) => {
            const workElement = createWorkElement(work);
            worksDiv.appendChild(workElement);
        });

        modalWrapper.appendChild(worksDiv);

        /* Création de la div pour le bouton "Ajouter une photo" */
        const addPhotoButtonModal = document.createElement('div');
        addPhotoButtonModal.classList.add('add-photo-modal');

        const addPhotoButton = document.createElement('button');
        addPhotoButton.textContent = 'Ajouter une photo';
        addPhotoButton.classList.add('add-photo-button');
        addPhotoButton.style.backgroundColor = '#1D6154';
        addPhotoButton.style.color = 'white';
        addPhotoButton.style.padding = '10px';
        addPhotoButton.style.border = 'none';
        addPhotoButton.style.cursor = 'pointer';
        addPhotoButton.style.marginTop = '20px';
        addPhotoButton.style.borderRadius = '20px';
        addPhotoButton.style.width = '45%';

        addPhotoButtonModal.appendChild(addPhotoButton);
        modalWrapper.appendChild(addPhotoButtonModal);

        /* Gestionnaire d'événements pour le bouton Ajouter une photo */
        addPhotoButtonModal.addEventListener('click', function () {
            console.log('Ajouter une photo');
        });
    } catch (error) {
        console.log("Erreur lors de l'affichage des works dans la fenêtre modale : ", error);
    }
}

/*Fonction pour fermer la fenêtre modale*/
function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
}

/*Gestionnaire d'événements pour détecter les clics en dehors de la fenêtre */
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        closeModal();
    }
});


