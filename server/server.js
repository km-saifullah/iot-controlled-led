// server.js
const express = require("express");
const http = require("http");
const { SerialPort } = require("serialport");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Enable CORS for requests from your Vite app
app.use(cors({ origin: "http://localhost:5173" }));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const port = new SerialPort({ path: "/dev/ttyUSB0", baudRate: 9600 });

app.get("/", (req, res) => {
  res.send("Arduino LED control server");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("toggleLED", (status) => {
    if (status === "on") {
      port.write("1"); // Send '1' to Arduino to turn on LED
    } else {
      port.write("0"); // Send '0' to Arduino to turn off LED
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

