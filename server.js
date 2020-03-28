const path 	   = require('path');
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');

// Configuracão do nosso websocket.
const app    = express();
const server = http.createServer(app);
const io     = socketio(server);

// arquivos staticos.
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

// Porta da nossa aplicação.
const PORT = 3000 || process.env.PORT;

// Array que recebe as menssagens do nosso front-end.
let mensagens = [];

// Iniciando nosso websocket em tempo real.
io.on('connection', socket => {
	console.log(socket.id);
	socket.emit('render', mensagens);

	socket.on('chat', data => {
		mensagens.push(data);
		console.log(data);
		socket.broadcast.emit('messagereturn', data);
	});
});

// Rodando nossa aplicação com a configuracão do socket.io.
server.listen(PORT, () => console.log(`running and http://localhost:${PORT}`))