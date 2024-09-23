import {createButton, createDiv, useFetch} from './utils.js';

const chatPop =  document.querySelector('#chat-pop')//primeiro popup de preicsa de ajuda?
const chatImg =  document.querySelector('#img-pig')//primeiro popup de preicsa de ajuda?
const closeChatPop = document.querySelector(".chat-popup-close")//botao de fechar o pop-up
let flagDontWannaHelp = false//flag se o user ja fechou o popup
const chatChatBox = document.querySelector("#chat-box")//div que o chat em si esta
let flagNeedContext = true//flag que verifica se é a primeira mensagem do bot ou nn
// const cookies = document.cookie;
let sessionId = 0

// SHOW OR NOT SHOW CHAT ON SCREEN
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
function messageBalloon(bot, msg){
    const id = new Date().getTime();
    const classe = bot?"msg-bot":"msg-user";

    createDiv(id, classe, "#chat-chat");

    document.getElementById(`${id}`).textContent = msg;  
    document.getElementById(`${id}`).classList.add("msg");
}

//DEFINE CONTEXT'S
async function defineContext(){
    const contextos = await useFetch("get_context", 'GET')//[{id: 1, name: 'alunos'}, {id: 2, name: 'laboratorios'}, {id: 3, name: 'professor'}]//contextos mokados para teste
    {if(contextos[0] && contextos[1] != []){
        contextos[1].map((conexto)=>{
            createButton(`${conexto.id}`, "btn-context",`${conexto.context}`, "#chat-context")
    })}
}}

// SEMPRE MUDA O TIPO DE INPUT
function toggleContextInput(type){
    flagNeedContext = type
    if(flagNeedContext){
        document.querySelector("#chat-input").classList.remove("active")
        document.querySelector("#chat-context").classList.add("active")
    }else{
        document.querySelector("#chat-context").classList.remove("active")
        document.querySelector("#chat-input").classList.add("active")

}}

// SUBMIT CONTEXT
async function submitContext(){
    const btnsContextos = [...document.querySelectorAll(".btn-context")]
    btnsContextos.map(async (btn)=>{
        btn.addEventListener("click", async ()=>{
            messageBalloon(false, `${btn.innerHTML}`)
            const sessionIdObj = await useFetch("load_context", 'POST',{context_id: btn.id})
            if(sessionIdObj[0] && sessionIdObj[1] != []){
                sessionId = sessionIdObj[1].session_id;
                messageBalloon(true, `Ok! O que vocẽ quer saber sobre ${btn.innerHTML}?`)
            }
            toggleContextInput(false)
        })
    })}

//CLOSE CONTEXT FUNCTION
async function closeContext(){
    const response = await useFetch("close_context", 'POST', {session_id: sessionId})
    if(response[0] && response[1] != []){
        if(response[1].status > 0){
            messageBalloon(true, "Contexto Reiniciado!")
            toggleContextInput(true)
        }else{
            messageBalloon(true, "Erro ao reiniciar contexto!")
        }
    }
}

// function chatInteraction(){
//     if(!flagNeedContext){
        const enviar = document.querySelector("#chat-submit-btn")
        const inputChat = document.querySelector("#input-chatbox")
        enviar.addEventListener("click", async ()=>{

            if(inputChat.value !== '' && inputChat.value.trim() !== ''){ 
            messageBalloon(false, `${inputChat.value}`)
            const mensagem = await useFetch("send_message", 'POST', {session_id: sessionId, message: `${inputChat.value}`})
            if(mensagem[0], mensagem[1] != []){
                if(mensagem[1].status > 0){
                    messageBalloon(true, mensagem[1].answer)
                }else{
                    messageBalloon(true, mensagem[1].status)
                }
            }
            inputChat.value = ""}
        })
        inputChat.addEventListener('keydown', async (event)=>{
            if(event.key === 'Enter'){
                if(inputChat.value !== '' && inputChat.value.trim() !== ''){
                messageBalloon(false, `${inputChat.value}`)
                const mensagem = await useFetch("send_message", 'POST', {session_id: sessionId, message: `${inputChat.value}`})
                if(mensagem[0], mensagem[1] != []){
                    if(mensagem[1].status > 0){
                        messageBalloon(true, mensagem[1].answer)
                    }else{
                        messageBalloon(true, mensagem[1].status)
                    }
                }
                inputChat.value = ""}
            }
        })
//     }
// }

await defineContext()
toggleContextInput(true)
await submitContext()
// chatInteraction()





