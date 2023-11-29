const gallery = document.querySelector('gallery');

async function main () {
    displayworks ();
}

main();

/*** appel de l'API ***/

/**works ***/
async function getWorks () {
    try {
        const worksResponse = await fetch ("http://localhost:5678/api/works");
        return worksResponse.json();
    }
    catch (error) {
        console.log("Erreur durant la récupération des projets dans l'API")
    }
}

/**category */
async function getCategories () {
    try {
        const categoriesResponse = await fetch ("http://localhost:5678/api/categories");
        return categoriesResponse.json();
    }
    catch (error) {
        console.log("Erreur durant la récupération des catégories dans l'API")
    }
}
/***Affichage dynamique de la gallery ***/
async function displayWorks(categorieId) {

try {
    const dataworks = await getWorks();
    gallery.innerHTML = "";

    dataworks.forEach((works) => {
        if (categorieId == works.category.id || categorieId == null) {
            createWorks(works);
        }
    });
    catch (error) {
        console.log("Erreur durant l'affichage des projets")
    }
}}

/*** Création des projets dans la gallery ***/
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