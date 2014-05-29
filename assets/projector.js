socket.on('clearChoices', function (data)
{
	$("#artemisChoices").html('');
	$("#zeffChoices").html('');
});

socket.on('updateArtemisChoices', function (data)
{
	$("#characters").show();
	$("#background").hide();
	
	var nextLine = $('<a />',
	{
		text: data.line,
		id: data.leadsTo
	});

	$("#artemisChoices").append(nextLine);
	$("#artemisChoices").append("<p/>");
});

socket.on('updateZeffChoices', function (data)
{
	$("#characters").show();
	$("#background").hide();
	
	var nextLine = $('<a />',
	{
		text: data.line,
		id: data.leadsTo
	});

	$("#zeffChoices").append(nextLine);
	$("#zeffChoices").append("<p/>");
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
	$("#characters").hide();
	$("#background").show();
	$("#narration").html('');
	$("#narration").append(data.line);
});

var artemisCurrentEmotion = null;
var zeffCurrentEmotion = null;
socket.on('updatePortraits', function (data)
{
	if (data.speaker == "artemis")
	{
		$("#artemisPortrait").addClass("artemis_"+data.emotion);
		if (artemisCurrentEmotion && artemisCurrentEmotion != data.emotion)
		{
			$("#artemisPortrait").removeClass("artemis_"+artemisCurrentEmotion);
		}
		artemisCurrentEmotion = data.emotion;
	}
	else if (data.speaker == "zeff")
	{
		$("#zeffPortrait").addClass("zeff_"+data.emotion);
		if (zeffCurrentEmotion && zeffCurrentEmotion != data.emotion)
		{
			$("#zeffPortrait").removeClass("zeff_"+zeffCurrentEmotion);
		}
		zeffCurrentEmotion = data.emotion;
	}
});

socket.on('unlockAchievement', function (data)
{
	$("#achievement").html('');
	$("#achievement").append("<span id=\"achievementTitle\">ACHIEVEMENT UNLOCKED</span><br>"+data.description);
	$("#achievements").fadeIn('slow').delay(3000).fadeOut('slow');
});

$(function()
{
	$("#characters").hide();
	$("#background").hide();
	$("#achievements").hide();
});
