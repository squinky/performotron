socket.on('updateMusic', function (data)
{
	$("#band").html('');
	$("#band").append(data.line);
});
