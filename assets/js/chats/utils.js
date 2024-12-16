async function useFetch(endpoit, metodo, body = ''){
    const initEnd = "http://localhost:8000/"
    console.log(initEnd, endpoit)
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
    
    return newDiv
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

//ADCIONA AS MAOZINHAS DE AVALIAÇAO
function handsButtons(msgId, sectionId){
    const envelopmentDiv = createDiv(`${msgId}-avaliation`, 'avaliation-div', `#chat-chat`)

    envelopmentDiv.innerHTML = "Avalie essa resposta: "

    const okHand = document.createElement("i")
    okHand.setAttribute("class", "ok_hand bi bi-hand-thumbs-up-fill")
    okHand.addEventListener("click",  ()=>{
        useFetch(`chatbot/feedback?status=true&?message_id=${msgId}&?session_id=${sectionId}`, 'POST')
        envelopmentDiv.remove()
    })

    const notOkHand = document.createElement("i")
    notOkHand.setAttribute("class", "not_ok_hand bi bi-hand-thumbs-down-fill")
    notOkHand.addEventListener("click",  ()=>{
        useFetch(`chatbot/feedback?status=false&?message_id=${msgId}&?session_id=${sectionId}`, 'POST')
        envelopmentDiv.remove()
    })
    envelopmentDiv.appendChild(okHand)
    envelopmentDiv.appendChild(notOkHand)

}

export { useFetch, createDiv, createButton, getCookie, handsButtons}
