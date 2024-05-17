const express = require('express');
const http = require('http');
const socketSetup = require('./socket');

const port = process.env.PORT || 3000
var app = express();
let server = http.createServer(app);

socketSetup(server)

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

server.listen(port);
