const net = require('net');

// Create client
const client = new net.Socket();

client.connect(3000, 'localhost', () => {
    console.log('Connected to server');
    // Send message
    client.write('Hello server!');
});

client.on('data', (data) => {
    console.log('Received from server:', data.toString());
});

client.on('close', () => {
    console.log('Connection closed');
});

client.on('error', (err) => {
    console.error('Client error:', err);
});