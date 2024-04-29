/* server.js */
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

let  y = 1000;

// Handle websocket connections
io.on('connection', (socket) => {
    console.log('A client has connected');    
});

// Sending data to the server every 2 seconds
setInterval(() => {
    y += Math.round(100 + Math.random() *(-100-100));
    io.emit('data', JSON.stringify({
        value: y
    }))
}, 2000)

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});