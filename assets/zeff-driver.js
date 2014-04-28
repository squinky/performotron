var socket = io.connect('http://performotron.ngrok.com');

socket.on('clearChoices', function (data)
{
	$("#zeffChoices").html('');
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

function clickChoice(e, speech)
{
    e.preventDefault();
    
    socket.emit("clickChoice", { speech: speech });
}
