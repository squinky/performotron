var socket = io.connect('http://performotron.ngrok.com');

socket.on('clearChoices', function (data)
{
	$("#artemisChoices").html('');
	$("#zeffChoices").html('');
});

socket.on('updateArtemisChoices', function (data)
{
	$("#characters").show();
	$("#background").hide();
	$("#artemisChoices").append(data.line);
	$("#artemisChoices").append("<p/>");
});

socket.on('updateZeffChoices', function (data)
{
	$("#characters").show();
	$("#background").hide();
	$("#zeffChoices").append(data.line);
	$("#zeffChoices").append("<p/>");
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

$(function()
{
	$("#characters").hide();
	$("#background").hide();
	$("#achievements").hide();
});
