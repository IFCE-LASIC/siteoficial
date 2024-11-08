async function useFetch(endpoit, metodo, body = ''){
    const initEnd = "http://llm.lasicifce.com.br"
    const response = await fetch(`${initEnd}${endpoit}`, {
        headers: { "Content-Type": "application/json"},
        method: metodo,
        body: body != ''? JSON.stringify(body): null
    })
    if(response.ok){
        const obj = await response.json()
        return [true, obj]
    }else{
        return [false, []]
    }
    
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

// Para obter todos os cookies como uma string
const allCookies = document.cookie;

// Para acessar cookies específicos
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export { useFetch, createDiv, createButton, getCookie}
