var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");
var app = express();
var port = process.env.PORT || 5000;

app.use(express.static(__dirname + "/public"));

var server = http.createServer(app);
server.listen(port);

console.log("http server listening on %d", port);

var wss = new WebSocketServer({server: server});
console.log("websocket server created");

var users = 0;
var temp = 0;
var humidity = 0;

wss.on("connection", function(ws) {
  users++;
  var obj = {users: users, temp: temp, humidity: humidity};
  wss.broadcast(JSON.stringify(obj));

  console.log("websocket connection open");
  ws.on("close", function() {
    console.log("websocket connection close");
    users--;
    obj.users = users;
    wss.broadcast(JSON.stringify(obj));

  })

  ws.on("message", function (message) {
	wss.broadcast(message);
  })

})


wss.broadcast = function broadcast(data) {
	wss.clients.forEach(function each(client) {
		client.send(data);
	});
};
