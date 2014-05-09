socket.on('clearSpeeches', function (data)
{
	$("#artemisSpeech").html('');
});

socket.on('updateArtemisSpeech', function (data)
{
	$("#artemisSpeech").append(data.line);
});
