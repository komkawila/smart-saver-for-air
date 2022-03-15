// Header
var mqtt = require('mqtt');
const server = require("http").createServer();
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});
// MQTT
const MQTT_SERVER = "dns.sttslife.co";
const MQTT_PORT = "1883";
const MQTT_USER = "root";
const MQTT_PASSWORD = "P@ssw0rd";

// Connect MQTT
var client = mqtt.connect({
    host: MQTT_SERVER,
    port: MQTT_PORT,
    username: MQTT_USER,
    password: MQTT_PASSWORD
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


// socketio
const PORT = 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {
        console.log("Connected...", socket.id);
        const { roomId } = socket.handshake.query;
        socket.join(roomId);
        socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
                io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
                console.log("Send MQTT : R " +roomId + "   | body : " + data.body.toString() )
                client.publish("R" + roomId,data.body.toString());
        });

        socket.on("message", function name(data) {
                console.log(data);
                io.emit("message", data);
        });

        socket.on("disconnect", () => {
                socket.leave(roomId);
        });
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});