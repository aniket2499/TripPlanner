const express = require("express");
const app = express();
const redis = require("redis");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const client = redis.createClient(6379);
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

function sendMessage(socket, data) {
  client.lRange(`${data}messages`, "0", "-1", (err, res) => {
    res.map((x) => {
      const usernameMessage = x.split(":");
      const redisUsername = usernameMessage[0];
      const redisMessage = usernameMessage[1];

      socket.emit("send_message", {
        room: data,
        author: redisUsername,
        message: redisMessage,
      });
    });
  });
}

io.on("connection", (socket) => {
  console.log("Here");
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    sendMessage(socket, data);
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    client.rPush(`${data.room.id}messages`, `${data.author}:${data.message}`);
    socket.to(data.room.id).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3002, () => {
  console.log("CHAT SERVER RUNNING on port 3002");
});
