const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://salesforce-ai-chat-production.up.railway.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });

  socket.on("completed", () => {
    socket.emit("isCompleted", { status: "completed" });
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("SERVER RUNNING");
});
