(function () {
	// code ..
	'use static';

	// Variaveis de ambiente globais.
	const $ = item => document.querySelector(item);

	// chamando a função do nosso socket.io
	const socket = io();
	
	// Funcão para renderizar as menssagens.
	const renderMessage = message => {
		const div = document.createElement('div');
		div.innerHTML = `<p class="date">${message.data}</p> <p>${message.msg}</p>`;
		div.classList.add('msg');
		$('.chatbox').appendChild(div);
	}

	socket.on('render', msg => {
		for (dados of msg) {
			renderMessage(dados)
		}
	})

	socket.on('messagereturn', data => {
		renderMessage(data);
	});

	// Função responsavel por enviar menssagem ao nosso back-end.
	$('#form').addEventListener('submit', e => {
		
		e.preventDefault();

		let data 	= new Date();
		let day 	= data.getDate();
		let month   = data.getMonth() + 1;
		let year    = data.getFullYear();
		let hours   = data.getHours();
		let minutes = data.getMinutes();
		let seconds = data.getSeconds();

		if (day < 10) { day = '0' + day; }
		if (month < 10) { month = '0' + month; }
		if (hours < 10) { hours = '0' + hours; }
		if (minutes < 10) { minutes = '0' + minutes; }
		if (seconds < 10) { seconds = '0' + seconds; }

		const horario = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

		const mensagem = $('.input-form-control').value;

		const dados = { 
			data: horario, 
			msg: mensagem
		}


		// Mandando as informações para o nosso back-end via socket.
		socket.emit('chat', dados);
		// Tentando retornar as mensagens em tempo real.
		renderMessage(dados);
		$('.input-form-control').value = '';
	})

})();