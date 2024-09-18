function useFetch(endpoit, metodo){
    
}
function createDiv(id, classe, where){
    const newDiv = document.createElement("div")
    newDiv.classList.add(classe)
    newDiv.setAttribute("id", id)

    document.querySelector(where).appendChild(newDiv)
    
}

function createButton(id, classe, inner, where){
    const newButton = document.createElement("button")

    newButton.setAttribute("id", id);
    newButton.setAttribute("class", classe)
    newButton.innerHTML = inner

    document.querySelector(where).appendChild(newButton)
}

export { useFetch, createDiv, createButton}