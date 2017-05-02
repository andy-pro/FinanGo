import mongodb from './mongodb'

export default wss => {

  wss.on('connection', (ws) => {

    console.log('Client connected');

    ws.on('close', () => console.log('Client disconnected'));

    ws.on('message', msg => mongodb.message(msg, ws, wss))

  });


  // =========== for testing ==============
  /*
  setInterval(() => {
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({
        type:'time',
        payload: new Date().toTimeString()
      }));
    });
  }, 1000);
  */
  // =========== for testing ==============


}
