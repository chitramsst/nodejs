const socket= io('http://localhost:3000')

const messageInput = document.getElementById('chat-message')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('chat-form')


const name = prompt("what is your name")
appendMessage('you joined');

/* send new user joined message to the sever */
socket.emit('new-user',name)

/* receied new user connected messsage from the server */
socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})


/* received message from server */
socket.on('chat-message', data => {
    appendMessage(`${data.name} : ${data.message}`)
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

/* append message to the container */
function appendMessage(data){
      const rowElement = document.createElement('div')
      rowElement.className = "w-10"
         const messageElement = document.createElement('button')
         messageElement.id = "user-text"
         messageElement.className = "bg-primary btn text-white text-right float-end"
         messageElement.innerText = data
         rowElement.append(messageElement)
         messageContainer.append(rowElement)
}