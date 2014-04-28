var socket = io.connect('http://performotron.ngrok.com');

socket.on('clearChoices', function (data)
{
	$("#artemisChoices").html('');
	$("#zeffChoices").html('');
});

socket.on('updateArtemisChoices', function (data)
{
	$("#artemisChoices").append(data.line);
	$("#artemisChoices").append("<p/>");
});

socket.on('updateZeffChoices', function (data)
{
	$("#zeffChoices").append(data.line);
	$("#zeffChoices").append("<p/>");
});
