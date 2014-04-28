var socket = io.connect('http://performotron.ngrok.com');

socket.on('clearSpeeches', function (data)
{
	$("#zeffSpeech").html('');
});

socket.on('updateZeffSpeech', function (data)
{
	$("#zeffSpeech").append(data.line);
});
