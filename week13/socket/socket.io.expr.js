// server.js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const rooms = ['room1', 'room2'];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/sock.io.test.html');
});

io.on('connection', (socket) => {

    const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
    socket.join(randomRoom);

    socket.emit('room-joined', randomRoom);
    
    const intervalId = setInterval(() => {
        socket.emit('server-time', new Date().toISOString());
    }, 1000);

    socket.on('echo-message', ({ message, room }) => {
        socket.emit('echo-response', `Message: ${message}`);
        io.to(room).emit('echo-response', `Room : ${room} Message: ${message}`);
    });
    
    // Cleanup on disconnect
    socket.on('disconnect', () => {
        if(intervalId){
        clearInterval(intervalId);
        }
        console.log('Client disconnected');
    });
});

server.listen(8080, () => {
    console.log('Server running on port 8080');
});