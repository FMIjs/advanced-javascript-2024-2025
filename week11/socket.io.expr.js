// server.js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/sock.io.test.html');
});

io.on('connection', (socket) => {
    console.log('Client connected');
    
    setInterval(() => {
        socket.emit('server-time', new Date().toISOString());
    }, 1000);
    
    // Handle echo messages
    socket.on('echo-message', (msg) => {
        socket.emit('echo-response', `Echo: ${msg}`);
    });
    
    // Cleanup on disconnect
    socket.on('disconnect', () => {
        clearInterval(intervalId);
        console.log('Client disconnected');
    });
});

server.listen(8080, () => {
    console.log('Server running on port 8080');
});