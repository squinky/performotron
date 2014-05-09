socket.on('clearChoices', function (data)
{
	$("#artemisChoices").html('');
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

function clickChoice(e, speech)
{
    e.preventDefault();
    
    socket.emit("clickChoice", { speech: speech });
}
