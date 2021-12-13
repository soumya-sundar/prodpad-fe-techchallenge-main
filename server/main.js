"use strict";
(function(){
	var connections = [];
	var http = require('http');
	var WebSocketServer = require('websocket').server;
	var webSocketsServerPort = 13370;
	var httpServer = http.createServer();
	httpServer.listen(webSocketsServerPort, function() {
		console.log((new Date()) + " :: The server is listening on port " + webSocketsServerPort);
	});
	var webSocketServer = new WebSocketServer({ httpServer });
	webSocketServer.on('request', function(request) {
		console.log((new Date()) + " :: Connection from origin " + request.origin + ".");
		var connection = request.accept(null, request.origin); 
		var index = connections.push(connection);
		connection.on('message', function(message) {
			for (var i=0; i < connections.length; i++) {
				connections[i].sendUTF(message.utf8Data);
			}
		});
		connection.on('close', function(connection) {
			console.log((new Date()) + " :: Peer " + connection.remoteAddress + " disconnected.");
			connections.splice(index, 1);
		});
	});
})();