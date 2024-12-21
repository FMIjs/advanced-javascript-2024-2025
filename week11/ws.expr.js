const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/ws.test.html');
});

// Handle WebSocket connections
webSocketServer.on('connection', (ws) => {
    console.log('Client connected');

    ws.send('Welcome to the WebSocket server!');
    ws.on('message', (message) => {
        console.log('Received:', message.toString());
        
        // Broadcast to all clients
        webSocketServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Server broadcast: ${message}`);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});