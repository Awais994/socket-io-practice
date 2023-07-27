import React from "react";
import "./chat.css";
import { useEffect, useState, useRef } from "react";
import socketIo from "socket.io-client";
// import socketClient from 'socket.io-client';
import { userX } from "../../componets/user/user";
import Messages from "../messages/Messages";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { toast } from "react-toastify";

let socket;
function Chat() {
  const [id, setid] = useState("");
  const [messages, setMessages] = useState([]);
  const [td, setTD] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    if (!message == "") {
      socket.emit("message", { message, id });
      document.getElementById("chatInput").value = "";
    } else {
      toast.error("Please enter a message", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
  useEffect(() => {
    socket = socketIo("http://localhost:3000", {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log("connected");
      setid(socket.id);
    });
    socket.emit("joined", { userX });

    socket.on("userJoined", (data) => {
      console.log(data);
      console.log(data.message);
      // setMessages([...messages, data]);
      setTD([...td, data]);
    });
    socket.on("welcome", (data) => {
      // console.log(data.message);
      setMessages([...messages, data]);
    });
    socket.on("leave", (data) => {
      // console.log(data.message);
      setMessages([...messages, data]);
    });

    return () => {
      socket.emit("disconnectt");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      // console.log(data);
      // console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  console.log(messages);
  console.log(td);
  localStorage.setItem("user", JSON.stringify(messages));
  return (
    <div id="main">
      <div className="chat-container">
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Messages
              key={i}
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
          {/* <Messages/> */}
        </ReactScrollToBottom>
      </div>

      <div id="submit">
        {/* <form action="#" id='submit'> */}
        <input
          onKeyPress={(e) => (e.key === "Enter" ? send() : null)}
          type="text"
          placeholder="Type here!"
          id="chatInput"
          required
        />
        <button onClick={send} type="submit" className="submit">
          SEND
        </button>
        {/* </form> */}
      </div>
    </div>
  );
}

export default Chat;
