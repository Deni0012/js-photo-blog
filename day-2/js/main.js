const urlApi = "https://lanciweb.github.io/demo/api/pictures/";
const bodyElement = document.body;
const parentElement = document.getElementById("card-container");
const overlayElement = document.getElementById("overlay-container");
const closeButtonElement = document.getElementById("close-button");
const overlayImgElement = document.getElementById("overlay-img");

let cardElements;

// Chiamata all'endpoint urlAPI alla risposta invoca la funzione renderHTML
axios.get(urlApi)
.then(response => renderHTML(parentElement, response.data))
.catch(error => console.error(error));


closeButtonElement.addEventListener("click", closeOverlay);

/*
Funzione che accetta due parametri:
- un elemento "padre" che è il contenitore in cui appendere i nuovi elementi.
- un array su cui itineremo per generare un nuovo elemento con createHTML per ogni elemento dell'array.
- Dopo aver renderizzato gli elementi aggiungiamo a loro un evento, non possiamo farlo direttamente sul selettore cardElements
  quindi itineriamo negli elementi del array cardElements aggiungendo ad ognuno di essi il addEventListener.
- Definiamo la variabile imgElement e gli diamo come valore l'elemento img nel div Card.
- Quindi dalla variabile imgElement ci prendiamo la proprietà source e la assegniamo alla proprietà source dell'elemento overlayImgElement
*/
function renderHTML(parent, childArray) {
    parent.innerHTML = "";
    for (let i = 0; i < childArray.length; i++) {
        let element = childArray[i];
        let childElement = createHTML(element);
        parent.appendChild(childElement);
    }

    cardElements = document.querySelectorAll(".card");

    cardElements.forEach(card => {
        card.addEventListener("click", function () {
            let imgElement = card.querySelector("img");
            if (imgElement) {
                overlayImgElement.src = imgElement.src;
            }
            openOverlay();
        });
    });
}

/*
Funzione che accetta un parametro dalla quale utilizzeremo le proprietà del oggetto per creare un nuove elemento HTML
*/
function createHTML(member) {
    let element = document.createElement("div");
    element.classList.add("card");

    element.innerHTML = ` 
                <img src="${member.url}" alt="">
                <p class="date-card">${member.date}.</p>
                <p>${member.title.toUpperCase()}.</p>
                <img class="pin" src="img/pin.svg" alt="">`;

    return element
}

/*
Funzione che apre l'overlay
*/
function openOverlay() {
    bodyElement.classList.add("no-scroll")
    overlayElement.classList.remove("d-none");
}

/*
Funzione che chiude l'overlay
*/
function closeOverlay() {
    overlayElement.classList.add("d-none")
    bodyElement.classList.remove("no-scroll")
}