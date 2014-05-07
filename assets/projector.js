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

$(function()
{
	$("#characters").hide();
	$("#background").hide();
	$("#achievements").hide();
});
