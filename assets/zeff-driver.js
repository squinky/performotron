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

socket.on('highlightSelected', function (data)
{
	$("#zeffChoices a").wrap("<div id=\"unselectable\"></div>");
	$("#"+data.id).unwrap();
	$("#"+data.id).wrap("<div id=\"highlighted\"></div>");
	$("#zeffChoices a").contents().unwrap();
});

function clickChoice(e, speech)
{
    e.preventDefault();
    
    socket.emit("clickChoice", { speech: speech });
}
