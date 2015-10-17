var WebSocketServer = require('websocket').server;
var http = require('http');
var fs = require('fs');

var clients = [ ];

var server = http.createServer(function(request, response) {
    if(request.url == "/"){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(fs.readFileSync('racermaster.html'));
    }else if(request.url == "/sprites.png"){
        response.writeHead(200, {'Content-Type': 'image/png'});
        response.end(fs.readFileSync('sprites.png'));
    }
});
server.listen(8888, function() { });

wsServer = new WebSocketServer({
    httpServer: server
});
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    var index = clients.push(connection) - 1;
    
    connection.on('message', function(message) {
        if (message.type === 'utf8') 
            for (var i=0; i < clients.length; i++)
                clients[i].sendUTF(message.utf8Data);
    });
});




    
    