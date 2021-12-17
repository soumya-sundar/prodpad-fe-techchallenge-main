"use strict";

(function(){
	var connections = [];
	var http = require('http');
	var WebSocketServer = require('websocket').server;
	var webSocketsServerPort = 13370;
	var httpServer = http.createServer();
	var messages = [];
	httpServer.listen(webSocketsServerPort, function() {
		console.log((new Date()) + " :: The server is listening on port " + webSocketsServerPort);
	});
	var webSocketServer = new WebSocketServer({ httpServer });

	webSocketServer.on('request', function(request) {
		console.log((new Date()) + " :: Connection from origin " + request.origin + ".");
		var connection = request.accept(null, request.origin); 
		var index = connections.push(connection);
	  
		//Sending message history to new clients on open event.
		if(messages.length > 0){
			for (var i=0; i < connections.length; i++) {
			  connections[i].send(JSON.stringify(messages));
			}		
		}

		connection.on('message', function(message) {
			for (var i=0; i < connections.length; i++) {
				connections[i].send(message.utf8Data);
			}
			const data = JSON.parse(message.utf8Data)
			
			//Accumulating messages for message history.
			if(data.input){
				messages.push({ input: data.input, time: data.time});
			}
		});
		
		connection.on('close', function(connection) {
			console.log((new Date()) + " :: Peer " + connection.remoteAddress + " disconnected.");
			connections.splice(index, 1);
		});
	});
})();