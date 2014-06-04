socket.on('clearSpeeches', function (data)
{
	$("#artemisSpeech").html('');
	$("#zeffSpeech").html('');
	$("#narration").html('');
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
	var nextLine = $('<a />',
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
	var nextLine = $('<a />',
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
	$("#artemisChoices a").wrap("<div id=\"unselectable\"></div>");
	$("#zeffChoices a").wrap("<div id=\"unselectable\"></div>");
	$("#"+data.id).unwrap();
	$("#"+data.id).wrap("<div id=\"highlighted\"></div>");
	$("#artemisChoices a").contents().unwrap();
	$("#zeffChoices a").contents().unwrap();
});

socket.on('updateNarration', function (data)
{
	$("#narration").append(data.line);
});

socket.on('updateMusic', function (data)
{
	$("#band").html('');
	$("#band").append(data.line);
});

socket.on('updateBackgroundButton', function (data)
{
	if (data.yay)
	{
		$("#backgroundEventButton").css("background", "#ffbf4d");
		$("#backgroundEventButton").css("cursor", "pointer");
	}
	else
	{
		$("#backgroundEventButton").css("background", "#7f5d20");
		$("#backgroundEventButton").css("cursor", "default");
	}
});

socket.on('updateWeirdness', function (data)
{
	$("#weirdnessLevelButton").html('');
	$("#weirdnessLevelButton").append("WEIRD-NESS LEVEL = "+data.weirdnessLevel);
});

socket.on('updateQueuedTopics', function (data)
{
	$("#queuedTopics").html('');
	$("#queuedTopics").append(data.topics);
});

socket.on('updateAchievements', function (data)
{
	$("#achievements").html('');
	$("#achievements").append(data.topics);
});

$("#nextButton").click(function()
{
	socket.emit("clickNext");
});

$("#backgroundEventButton").click(function()
{
	socket.emit("clickBackground");
});

$("#wrapUpButtonGood").click(function()
{
	socket.emit("clickEnding", { endings: "good" });
});

$("#wrapUpButtonNeutral").click(function()
{
	socket.emit("clickEnding", { endings: "neutral" });
});

$("#wrapUpButtonBad").click(function()
{
	socket.emit("clickEnding", { endings: "bad" });
});

$("#weirdnessLevelButton").click(function()
{
	socket.emit("clickWeirdness");
});

$("#resetButton").click(function()
{
	socket.emit("clickReset");
});

function clickChoice(e, speech)
{
    e.preventDefault();
    
    socket.emit("clickChoice", { speech: speech });
}
