socket.on('clearSpeeches', function (data)
{
	$("#zeffSpeech").html('');
});

socket.on('updateZeffSpeech', function (data)
{
	$("#zeffSpeech").append(data.line);
});
