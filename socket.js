const socketIO = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

module.exports = (server) => {

    const io = socketIO(server,{
        maxHttpBufferSize: 30 * 1024 * 1024
    });

    io.on('connection', (socket) => {
        socket.id = uuidv4();
        console.log('Connected to client. id : ', socket.id);

        socket.emit('newMessage', {
            from: 'node.js-server',
            text: 'Hello from node.js server'
        });

        socket.on('createMessage', (mes) => {
            console.log(`id : ${socket.id} | message : ${JSON.stringify(mes)}`);
        });

        socket.on('audioStream', data => {

            const audioDir = path.join(__dirname, 'audio');
            if (!fs.existsSync(audioDir)) {
                fs.mkdirSync(audioDir);
            }

            const filename = uuidv4() + '.wav';
            const filepath = path.join(audioDir, filename);

            console.log("----------- Reciving from Socket ID : ", socket.id);
            console.log('Receiving audio data started...');
            fs.appendFileSync(filepath, data);
            console.log('Receiving audio data completed...');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from client. id : ', socket.id);
        });
    });
};