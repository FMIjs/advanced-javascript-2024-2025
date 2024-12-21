const net = require('net');

const server = net.createServer((socket) => {
    console.log('client connected');
    setInterval(() => {
        socket.write(`${ new Date().toLocaleString() } \n`);
    }, 1000);

    socket.on('data', (data) => {
        // Echo back
    });
    
    socket.on('end', () => {
        console.log('Client disconnected');
    });
    
    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});