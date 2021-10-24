this.socketOptions = {
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vaGFtbWFkIiwic3ViIjoxLCJpYXQiOjE2MzUxMDU4MDIsImV4cCI6MTYzNTEwNTg1Mn0.D4ueAhj3iFwL6p-Q-3cqG7JgmUu_IsLOpu5mgoP8zIo',
      }
    }
  }
};

const socket = io("http://localhost:3000", this.socketOptions)

const message = document.getElementById('message');
const messages = document.getElementById('messages');

const handleSubmitNewMessage = () => {
  socket.emit('message', { data: message.value })
}

socket.on('message', ({ data }) => {
  handleNewMessage(data);
})

const handleNewMessage = (message) => {
  messages.appendChild(buildNewMessage(message));
}

const buildNewMessage = (message) => {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(message))
  return li;
}