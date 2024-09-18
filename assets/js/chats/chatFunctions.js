import {createButton, createDiv} from './utils.js';

const chatPop =  document.querySelector('#chat-pop')//primeiro popup de preicsa de ajuda?
const closeChatPop = document.querySelector(".chat-popup-close")//botao de fechar o pop-up
let flagDontWannaHelp = false//flag se o user ja fechou o popup
const chatChatBox = document.querySelector("#chat-box")//div que o chat em si esta
let flagNeedContext = true//flag que verifica se é a primeira mensagem do bot ou nn

// SHOW OR NOT SHOW CHAT ON SCREEN
const toggleChatPop = () => {
if (window.scrollY > 950 && !flagDontWannaHelp) {
    chatPop.classList.add('active')
    chatPop.addEventListener('mouseenter', (who)=>{
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
chatPop.addEventListener("click", ()=>{
    chatChatBox.classList.add('active')
    chatPop.classList.remove('active')
    closeChatPop.classList.remove('active')
    flagDontWannaHelp = true
    messageBalloon(true, "Olá! De que tipo de ajuda você precisa?")

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
function defineContext(){
    const contextos = [{id: 1, name: 'alunos'}, {id: 2, name: 'laboratorios'}, {id: 3, name: 'professor'}]//contextos mokados para teste
    if(contextos.length != 0){
        contextos.map((conexto)=>{
            createButton(`btn-context-${conexto.id}`, "btn-context",`${conexto.name}`, "#chat-context")
    })
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
function submitContext(){
    const btnsContextos = [...document.querySelectorAll(".btn-context")]
    btnsContextos.map((btn)=>{
        btn.addEventListener("click", ()=>{
            messageBalloon(false, `${btn.innerHTML}`)
            // funcao de enviar contextos
            toggleContextInput(false)
        })
    })}

//CLOSE CONTEXT FUNCTION
function closeContext(){
    //fatch de fechar contexto
    toggleContextInput(true)
}

// function chatInteraction(){
//     if(!flagNeedContext){
        const enviar = document.querySelector("#chat-submit-btn")
        const inputChat = document.querySelector("#input-chatbox")
        enviar.addEventListener("click", ()=>{
            messageBalloon(false, `${inputChat.value}`)
            //funciton fetch enviar mensagem
            // if(response.ok){
            //     messageBalloon(true, response.msg)
            // }
            inputChat.value = ""
        })
//     }
// }

defineContext()
toggleContextInput(true)
submitContext()
// chatInteraction()





