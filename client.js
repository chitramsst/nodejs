const socket= io('http://localhost:3000')

const messageInput = document.getElementById('chat-message')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('chat-form')


const name = prompt("what is your name")
appendFromUserMessage('you joined');

/* send new user joined message to the sever */
socket.emit('new-user',name)

/* receied new user connected messsage from the server */
socket.on('user-connected', name => {
    appendFromUserMessage(`${name} connected`)
})


socket.on('chat-from-message', data => {
    appendFromUserMessage(data.message)
})

/* received message from server */
socket.on('chat-message', data => {
    //appendMessage(`${data.name} : ${data.message}`)
    appendMessage(`${data.message}`)
})

/* when click send button */
messageForm.addEventListener('submit', e=> {
    e.preventDefault();
    const message = messageInput.value
    /* send message to server */
    socket.emit('send-chat-message',`${message}`)
    messageInput.value = ''
})

/* called while disconnect the server */
socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})

/* append message to the container (to user) */
function appendMessage(data){
      const rowElement = document.createElement('div')
      rowElement.className = "w-10 mb-3"
         const messageElement = document.createElement('button')
         messageElement.className = "bg-primary btn text-white float-end"
         messageElement.innerText = data
         rowElement.append(messageElement)
         const clearFixElement = document.createElement('div')
         clearFixElement.className = "clearfix mb-3";
         messageContainer.append(clearFixElement)
         messageContainer.append(rowElement)
}

/* append from user to the container */
function appendFromUserMessage(data){
    const rowElement = document.createElement('div')
    rowElement.className = "w-10 mb-3"
       const messageElement = document.createElement('button')
       messageElement.className = "bg-light btn text-black"
       messageElement.innerText = data
       rowElement.append(messageElement)
       const clearFixElement = document.createElement('div')
       clearFixElement.className = "clearfix";
       messageContainer.append(clearFixElement)
       messageContainer.append(rowElement)
}