exports.start = (server) => {
  /* Starts socket.io to be listening on the specific server */
  let io = require('socket.io').listen(server);

  /* Listens for 'connection' messages
   * 'connection' messages are issues by front-end socket-io.js via the
   * io.connect() command */
  io.on('connection', function(socket) {
    console.log('Connection Event!');

    /* Triggered by joining a new room */
    socket.on('join', (roomID) => {
      socket.room = roomID;
      socket.join(roomID);

      console.log('New connection on room: ' + roomID);
      socket.emit('messages', 'thank you for joining ' + roomID);
    });

    /* Sent when leaving a room,  disconnecting the socket */
    socket.on('leave', (roomID) => {
      socket.leave(roomID);
    });
  });
};
