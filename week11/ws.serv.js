const WebSocket = require('ws');

// Create WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Handle connections
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Handle incoming messages
    ws.on('message', (message) => {
        console.log('Received:', message.toString());
        // Echo back to client
        ws.send(`Server received: ${message}`);
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});