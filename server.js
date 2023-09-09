const io = require("socket.io")(3000, {
    cors: {
    //   origin: "https://example.com",
      methods: ["GET", "POST"],
     // allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

  const users = {}
 io.on('connection', socket => {
    //socket.emit('chat-message','hello world')
    socket.on('new-user',name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected',name);
    })

    /* get response from the browser */
    socket.on('send-chat-message',message => {
      //  console.log(message)
      //socket.broadcast.emit('chat-message',message);

      /* broadcast to all connected clients */
      socket.broadcast.emit('chat-message',{message:message, name: users[socket.id] });
    })

    socket.on('disconnect',()=>{
        socket.broadcast.emit('user-disconnecred',users[socket.id])
        delete users[socket.id]
    })
 })
