import {createButton, createDiv, handsButtons, useFetch} from './utils.js';

const chatPop =  document.querySelector('#chat-pop')//primeiro popup de preicsa de ajuda?
const chatImg =  document.querySelector('#img-pig')//primeiro popup de preicsa de ajuda?
const closeChatPop = document.querySelector(".chat-popup-close")//botao de fechar o pop-up
let flagDontWannaHelp = false//flag se o user ja fechou o popup
const chatChatBox = document.querySelector("#chat-box")//div que o chat em si esta

let socket;

const toggleChatPop = () => {
if (window.scrollY > 950 && !flagDontWannaHelp) {
    chatPop.classList.add('active')
    chatPop.addEventListener('mouseenter', ()=>{
    closeChatPop.classList.add("active")
    closeChatPop.addEventListener("click",()=>{
        chatPop.classList.remove('active')
        closeChatPop.classList.remove('active')
        flagDontWannaHelp = true
    })
    })
    chatPop.addEventListener("mouseleave", ()=>{
    closeChatPop.classList.remove("active")
    })
} else {
    chatPop.classList.remove('active')
}
}
window.addEventListener('load', toggleChatPop);
document.addEventListener("scroll", toggleChatPop);

const openChat = ()=>{
chatImg.addEventListener("click", ()=>{
    chatChatBox.classList.add('active')
    chatPop.classList.remove('active')
    closeChatPop.classList.remove('active')
    flagDontWannaHelp = true
    messageBalloon(true, "Olá! De que tipo de ajuda você precisa?")
    toggleContextInput(true)

})
const sair = document.querySelector(".chat-close")
sair.addEventListener("click", ()=>{
    flagDontWannaHelp = false
    chatChatBox.classList.remove('active')
    closeContext()
    document.querySelector("#chat-chat").innerHTML = ''

})
}
window.addEventListener('load', openChat)


// CREATE MESSAGE BALLOON FUNCTION
function messageBalloon(bot = false, msg, ids, loading ){
    let id 
    if(loading){
        id = "loading_id"
    }else{
        id = ids? ids: new Date().getTime();
    }

    const classe = bot?"msg-bot":"msg-user";


    createDiv(id, classe, "#chat-chat");

    document.getElementById(`${id}`).textContent = msg;  
    document.getElementById(`${id}`).classList.add("msg");
    return id
}

//DEFINE CONTEXT'S
async function defineContext(){
    const contextos = await useFetch("contexts/get_contexts", 'GET')//[{id: 1, name: 'alunos'}, {id: 2, name: 'laboratorios'}, {id: 3, name: 'professor'}]//contextos mokados para teste
    {if(contextos[0] && contextos[1] != []){
        contextos[1].map((conexto)=>{
            createButton(`${conexto.id}`, "btn-context",`${conexto.name}`, "#chat-context")
    })}
}}

// SEMPRE MUDA O TIPO DE INPUT
function toggleContextInput(type){
    if(type){
        document.querySelector("#chat-input").classList.remove("active")
        document.querySelector("#chat-context").classList.add("active")
        return  
    }
    document.querySelector("#chat-context").classList.remove("active")
    document.querySelector("#chat-input").classList.add("active")
}


// SUBMIT CONTEXT
async function submitContext(){
    const btnsContextos = [...document.querySelectorAll(".btn-context")]
    btnsContextos.map(async (btn)=>{
        btn.addEventListener("click", async ()=>{
            messageBalloon(false, `${btn.innerHTML}`,99, false)
            socket = new WebSocket(`ws://localhost:8000/chatbot/ws/${btn.id}`);
            socket.addEventListener("message", (evento) => {
                const response = JSON.parse(evento.data);
                console.log(response)
                document.getElementById(`loading_id`)?.remove()
                messageBalloon(true, response.message, response.id)
                if (response.message != 'Logado'){
                    handsButtons(response.id)
                }
            });
            toggleContextInput(false)
            messageBalloon(true, `Ok! O que vocẽ deseja saber sobre ${btn.innerHTML}?`, 98, false)
        })
    })}
//CLOSE CONTEXT FUNCTION
async function closeContext(){
    socket.close()
}

const enviar = document.querySelector("#chat-submit-btn")
const inputChat = document.querySelector("#input-chatbox")
enviar.addEventListener("click", async ()=>{

    if(inputChat.value !== '' && inputChat.value.trim() !== ''){ 
        messageBalloon(false, `${inputChat.value}`)
        messageBalloon(true, "...", 0, true)

        const test = inputChat.value;
        inputChat.value = '';
        socket.send(test)
    inputChat.value = ""
    }
})
inputChat.addEventListener('keydown', async (event)=>{
    if(event.key === 'Enter'){
        if(inputChat.value !== '' && inputChat.value.trim() !== ''){
        messageBalloon(false, `${inputChat.value}`)
        messageBalloon(true, "...",0, true)

        const test = inputChat.value;
        inputChat.value = '';
        socket.send(test)
        inputChat.value = ""}
    }
})

await defineContext()
toggleContextInput(true)
await submitContext()





