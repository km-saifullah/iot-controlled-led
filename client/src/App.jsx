// src/App.jsx
import React, { useState } from "react";
import io from "socket.io-client";
import Image from "./components/Image";
import led from "/led.png";

const socket = io("http://localhost:3000", { transports: ["websocket"] });

function App() {
  const [ledStatus, setLedStatus] = useState("off");

  const toggleLED = () => {
    const newStatus = ledStatus === "off" ? "on" : "off";
    setLedStatus(newStatus);
    socket.emit("toggleLED", newStatus);
  };

  return (
    <div
      className={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1>IoT Controlled LED</h1>
        <Image imgSrc={led} />
        <p>Light Status: {ledStatus}</p>
        <button onClick={toggleLED}>
          Turn LED {ledStatus === "off" ? "On" : "Off"}
        </button>
      </div>
    </div>
  );
}

export default App;
