const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebSocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
        const { latitude, longitude, techs } = socket.handshake.query

        //Salvando todas conexões feitas na aplicação.
        connections.push({
            id: socket.id,
            coorninates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        });
    });
};

exports.findConnections = (coorninates, techs) => {
    return connections.filter(connection => {
        return calculateDistance(coorninates, connections.coorninates) < 20
            && connection.techs.some(item => techs.includes(item));
    })
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emmit(message, data);
    })
}