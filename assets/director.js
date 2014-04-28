var socket = io.connect('http://performotron.ngrok.com');

socket.on('clearSpeeches', function (data)
{
	$("#artemisSpeech").html('');
	$("#zeffSpeech").html('');
});

socket.on('clearChoices', function (data)
{
	$("#artemisChoices").html('');
	$("#zeffChoices").html('');
});

socket.on('updateArtemisSpeech', function (data)
{
	$("#artemisSpeech").append(data.line);
});

socket.on('updateZeffSpeech', function (data)
{
	$("#zeffSpeech").append(data.line);
});

socket.on('updateArtemisChoices', function (data)
{
	nextLine = $('<a />',
	{
		href: data.leadsTo,
		text: data.line,
		id: data.leadsTo
	});

	$("#artemisChoices").append(nextLine);
	$("#artemisChoices").append("<p/>");

	$("#"+data.leadsTo).click(function(event)
	{
		clickChoice(event, $(this).attr("id"));
	});
});

socket.on('updateZeffChoices', function (data)
{
	nextLine = $('<a />',
	{
		href: data.leadsTo,
		text: data.line,
		id: data.leadsTo
	});

	$("#zeffChoices").append(nextLine);
	$("#zeffChoices").append("<p/>");

	$("#"+data.leadsTo).click(function(event)
	{
		clickChoice(event, $(this).attr("id"));
	});
});

$("#nextButton").click(function()
{
	socket.emit("clickNext");
});

function clickChoice(e, speech)
{
    e.preventDefault();
    
    socket.emit("clickChoice", { speech: speech });
}
