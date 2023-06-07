module.exports = (io) => {
  console.log('socketPing.js module loaded.')

  io.on('connection', (socket) => {
    socket.on('ping', () => {
      console.log('ping');
      socket.emit('pong', `✅ ${Math.random()}`);
    });
  });
}
