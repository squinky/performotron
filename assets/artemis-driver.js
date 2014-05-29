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

socket.on('highlightSelected', function (data)
{
	$("#artemisChoices a").wrap("<div id=\"unselectable\"></div>");
	$("#"+data.id).unwrap();
	$("#"+data.id).wrap("<div id=\"highlighted\"></div>");
	$("#artemisChoices a").contents().unwrap();
});

function clickChoice(e, speech)
{
    e.preventDefault();
    
    socket.emit("clickChoice", { speech: speech });
}
