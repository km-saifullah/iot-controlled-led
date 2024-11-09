// src/App.jsx
import React, { useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [ledStatus, setLedStatus] = useState("off");

  const toggleLED = () => {
    const newStatus = ledStatus === "off" ? "on" : "off";
    setLedStatus(newStatus);
    socket.emit("toggleLED", newStatus);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Arduino LED Control</h1>
      <button onClick={toggleLED}>
        Turn LED {ledStatus === "off" ? "On" : "Off"}
      </button>
    </div>
  );
}

export default App;
