var socket = io.connect('http://performotron.ngrok.com');

socket.on('updateMusic', function (data)
{
	$("#band").html('');
	$("#band").append(data.line);
});
