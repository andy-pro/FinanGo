// import express from 'express';
// import { Server } from 'ws';
// import compression from 'compression';
// import config from './config';
// import errorHandler from './lib/errorHandler';
//
// import frontend from './frontend/render';
// import agent, { re_api } from './frontend/agent';
// import api from './api'
//
// const server = express();
// var wss = new Server({ server });
// server.use(compression());
// server.use('/assets', express.static('build', { maxAge: '200d' }));
// server.all(re_api, agent);
// server.use(frontend);
// server.get('*', errorHandler);
// server.listen(config.port, () => {
//   console.log(`Server started at http://localhost:${config.port}`);
// });
// api(wss);


//========================================================

import express from 'express';
// import { Server } from 'ws';
import compression from 'compression';
import config from './config';
import errorHandler from './lib/errorHandler';
import frontend from './frontend/render';
import agent, { re_api } from './frontend/agent';
import api from './api'

var WebSocketServer = require('ws').Server;
var server = require('http').createServer();

const app = express();
app.use(compression());
app.use('/assets', express.static('build', { maxAge: '200d' }));
app.all(re_api, agent);
app.use(frontend);
app.get('*', errorHandler);

// var wss = new Server({ server });
var wss = new WebSocketServer({ server });

server.on('request', app);

server.listen(config.port, () => {
  console.log(`http/ws server started at http://localhost:${config.port}`);
});

api(wss);
