socket.on('clearSpeeches', function (data)
{
	$("#artemisSpeech").html('');
});

socket.on('updateArtemisSpeech', function (data)
{
	flashScreen();
	$("#artemisSpeech").append(data.line);
});
