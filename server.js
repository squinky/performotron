var express = require('express');
var app = express()
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server);

server.listen(6969);

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/director.html'); });
app.get('/projector', function (req, res) {
	res.sendfile(__dirname + '/projector.html'); });
app.get('/artemis-puppet', function (req, res) {
	res.sendfile(__dirname + '/artemis-puppet.html'); });
app.get('/zeff-puppet', function (req, res) {
	res.sendfile(__dirname + '/zeff-puppet.html'); });
app.get('/artemis-driver', function (req, res) {
	res.sendfile(__dirname + '/artemis-driver.html'); });
app.get('/zeff-driver', function (req, res) {
	res.sendfile(__dirname + '/zeff-driver.html'); });
app.get('/band', function (req, res) {
	res.sendfile(__dirname + '/band.html'); });
app.use(express.static(__dirname + '/assets'));

io.sockets.on('connection', function (socket)
{
	io.sockets.emit("updateBackgroundButton", { yay: backgroundEventsEnabled() });
	io.sockets.emit("updateWeirdness", { weirdnessLevel: weirdnessLevel });

	socket.on("clickNext", function()
    {
    	io.sockets.emit("clearSpeeches");
        addNextLine();
		io.sockets.emit("updateBackgroundButton", { yay: backgroundEventsEnabled() });
    });
    
    socket.on("clickChoice", function(data)
    {
    	io.sockets.emit("clearChoices");
        addSpeechToQueue(data.speech);
		io.sockets.emit("updateBackgroundButton", { yay: backgroundEventsEnabled() });
    });
    
    socket.on("clickBackground", function()
    {
    	if (backgroundEventsEnabled())
    	{
    		io.sockets.emit("clearSpeeches");
			io.sockets.emit("clearChoices");
			queueBackgroundEvent();
			addNextLine();
			io.sockets.emit("updateBackgroundButton", { yay: backgroundEventsEnabled() });
		}
    });
    
    socket.on("clickWeirdness", function()
    {
    	weirdnessLevel++;
    	io.sockets.emit("updateWeirdness", { weirdnessLevel: weirdnessLevel });
    });
    
    socket.on("clickReset", function()
    {
    	currentLine = 0;
    	choicesA = 0;
    	choicesZ = 0;
    	queuedLines = new Array();
    	queuedTopics = new Array();
    	
    	backgroundEvents = new Array();
		backgroundEvents = backgroundEvents.concat(content.background);
    	
		io.sockets.emit("clearSpeeches");
		io.sockets.emit("clearChoices");
		io.sockets.emit("updateMusic", { line: null });
		
		addSpeechToQueue(startWith);
		io.sockets.emit("updateBackgroundButton", { yay: backgroundEventsEnabled() });
    });
});

var content = require('./content.json');
var currentLine = 0;
var choicesA = 0;
var choicesZ = 0;
var queuedLines = new Array();
var queuedTopics = new Array();
var weirdnessLevel = 1;

var backgroundEvents = new Array();
backgroundEvents = backgroundEvents.concat(content.background);

var allPronouns = require('./pronouns.json');
var pronouns = { "artemis": null, "zeff": null }
setPronoun("artemis", "they");
setPronoun("zeff", "ze");

var startWith = "zeffIntro";
addSpeechToQueue(startWith);

function unlockTopics(category)
{
	queuedTopics = content.topics[category].concat(queuedTopics);
}

function flushTopics()
{
	queuedTopics = new Array();
}

function addTopicsToQueue()
{
	queuedLines = queuedLines.concat(queuedTopics);
}

function addSpeechToQueue(speech)
{
	queuedLines = queuedLines.concat(content[speech]);
	
	for (var i = 0; i < queuedTopics.length; i++)
	{
		if (queuedTopics[i].leadsTo == speech)
		{
			queuedTopics.splice(i, 1);
			return;
		}
	}
}

function backgroundEventsEnabled()
{
	return (backgroundEvents.length > 0 && queuedTopics.length > 0 &&
		currentLine == queuedLines.length);
}

function queueBackgroundEvent()
{
	var next = getRandomInt(0, backgroundEvents.length - 1);
	var queuedEvent = backgroundEvents[next];
	backgroundEvents.splice(next, 1);
	queuedLines = queuedLines.concat(queuedEvent);
}

function addNextLine()
{
	if (currentLine < queuedLines.length)
	{
		var nextLine = "";
		
		if (queuedLines[currentLine].type == "speech")
		{
			nextLine = pronounify(queuedLines[currentLine].line);
			if (queuedLines[currentLine].speaker == "artemis")
			{
				io.sockets.emit("updateArtemisSpeech", { line: nextLine });
			}
			if (queuedLines[currentLine].speaker == "zeff")
			{
				io.sockets.emit("updateZeffSpeech", { line: nextLine });
			}
			currentLine++;
			choicesA = 0;
			choicesZ = 0;
			if (currentLine >= queuedLines.length) return;
		}
		if (queuedLines[currentLine].type == "choice")
		{
			var line = pronounify(queuedLines[currentLine].line);
			var leadsTo = queuedLines[currentLine].leadsTo;
		
			if (queuedLines[currentLine].speaker == "artemis" && choicesA < 5)
			{
				io.sockets.emit("updateArtemisChoices", { line: line, leadsTo: leadsTo });
				choicesA++;
			}
			if (queuedLines[currentLine].speaker == "zeff" && choicesZ < 5)
			{
				io.sockets.emit("updateZeffChoices", { line: line, leadsTo: leadsTo });
				choicesZ++;
			}
			
			currentLine++;
			addNextLine();
			return;
		}
		if (queuedLines[currentLine].type == "music")
		{
			var line = pronounify(queuedLines[currentLine].line);
			io.sockets.emit("updateMusic", { line: line });
			currentLine++;
			addNextLine();
			return;
		}
		if (queuedLines[currentLine].type == "emote")
		{
			var speaker = queuedLines[currentLine].speaker;
			var emotion = queuedLines[currentLine].emotion;
			
			io.sockets.emit("updatePortraits", { speaker: speaker, emotion:emotion });
			currentLine++;
			addNextLine();
			return;
		}
		if (queuedLines[currentLine].type == "setPronoun")
		{
			var speaker = queuedLines[currentLine].speaker;
			var pronoun = queuedLines[currentLine].pronoun;
			
			setPronoun(speaker, pronoun);
			currentLine++;
			addNextLine();
			return;
		}
		if (queuedLines[currentLine].type == "unlockTopics")
		{
			if (queuedLines[currentLine].weirdnessLevel <= weirdnessLevel)
			{
				unlockTopics(queuedLines[currentLine].category);
			}
			
			currentLine++;
			addNextLine();
			return;
		}
		if (queuedLines[currentLine].type == "flushTopics")
		{
			flushTopics();
			currentLine++;
			addNextLine();
			return;
		}
		if (queuedLines[currentLine].type == "showAvailableTopics")
		{
			addTopicsToQueue();
			currentLine++;
			addNextLine();
			return;
		}
		if (queuedLines[currentLine].type == "narration")
		{
			var line = pronounify(queuedLines[currentLine].line);
			io.sockets.emit("updateNarration", { line: line });
			
			currentLine++;
			choicesA = 0;
			choicesZ = 0;
		}
	}
}

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setPronoun(who, what)
{
	pronouns[who] = allPronouns[what];
}

function pronounify(str)
{
	var newStr = str;
	newStr = newStr.replace(/#artemisSub#/g, pronouns.artemis.sub);
	newStr = newStr.replace(/#artemisObj#/g, pronouns.artemis.obj);
	newStr = newStr.replace(/#artemisDet#/g, pronouns.artemis.det);
	newStr = newStr.replace(/#artemisPos#/g, pronouns.artemis.pos);
	newStr = newStr.replace(/#artemisRef#/g, pronouns.artemis.ref);
	newStr = newStr.replace(/#zeffSub#/g, pronouns.zeff.sub);
	newStr = newStr.replace(/#zeffObj#/g, pronouns.zeff.obj);
	newStr = newStr.replace(/#zeffDet#/g, pronouns.zeff.det);
	newStr = newStr.replace(/#zeffPos#/g, pronouns.zeff.pos);
	newStr = newStr.replace(/#zeffRef#/g, pronouns.zeff.ref);
	return newStr;
}
