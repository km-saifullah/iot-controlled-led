// server.js
const express = require("express");
const http = require("http");
const { SerialPort } = require("serialport");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "*" }));

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
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
      port.write("1"); //  '1' to Arduino to turn on LED
    } else {
      port.write("0"); //  '0' to Arduino to turn off LED
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
