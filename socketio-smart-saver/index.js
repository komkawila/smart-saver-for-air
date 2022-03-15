// Header
var config = require('./config');
var mqtt = require('mqtt');
const server = require("http").createServer();

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

// Connect MQTT
var client = mqtt.connect({
    host: config.MQTT_SERVER,
    port: config.MQTT_PORT,
    username: config.MQTT_USER,
    password: config.MQTT_PASSWORD
});

client.on('connect', function () {
    console.log("MQTT Connect");
    client.subscribe('#', function (err) {
        if (err) {
            console.log(err);
        }
    });
});

client.on('message', function (topic, message) {
    console.log("topic[" + topic + "]");
    console.log(message.toString());
    io.in(topic).emit(NEW_CHAT_MESSAGE_EVENT, message.toString());
});


// Socket.IO
const PORT = config.SOCKETIOPORT;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {
    console.log("Connected...", socket.id);
    const { roomId } = socket.handshake.query;
    socket.join(roomId);
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
        console.log(data.body)
        client.publish(roomId, data.body.toString());
    });
    socket.on("disconnect", () => {
        socket.leave(roomId);
    });
});

server.listen(PORT, () => {
    console.log(`Listening Socket.IO on port ${PORT}`);
});