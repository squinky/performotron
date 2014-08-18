socket.on('clearSpeeches', function (data)
{
	$("#zeffSpeech").html('');
});

socket.on('updateZeffSpeech', function (data)
{
	flashScreen();
	$("#zeffSpeech").append(data.line);
});
