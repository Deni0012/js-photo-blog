const urlApi = "https://lanciweb.github.io/demo/api/pictures/";
const parentElement = document.getElementById("card-container");

// Chiamata all'endpoint urlAPI alla risposta invoca la funzione renderHTML
axios.get(urlApi).then(response => renderHTML(parentElement, response.data)).catch(error => console.error(error));

/*
Funzione che accetta due parametri:
- un elemento "padre" che è il contenitore in cui appendere i nuovi elementi.
- un array su cui itineremo per generare un nuovo elemento con createHTML per ogni elemento dell'array.
*/
function renderHTML(parent, childArray) {
    parent.innerHTML = "";
    for (let i = 0; i < childArray.length; i++) {
        let element = childArray[i];
        let childElement = createHTML(element);
        parent.appendChild(childElement);
    }
}

/*
Funzione che accetta un parametro dalla quale utilizzeremo le proprietà del oggetto per creare un nuove elemento HTML
*/
function createHTML(member) {
    let element = document.createElement("div");
    element.classList.add("card");

    element.innerHTML = ` 
                <img src="${member.url}" alt="">
                <p>${member.title}.</p>
                <img class="pin" src="img/pin.svg" alt="">`;

    return element
}