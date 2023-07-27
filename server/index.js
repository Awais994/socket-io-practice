const express = require("express");
const http = require("http");
const socket = require("socket.io");

const app = express();
const port = process.env.PORT || 6000;
// const server=http.createServer(app);
const io = socket(app.listen(port));

const users = [{}];

io.on("connection", (socket) => {
  console.log("connected");
  // socket.emit('connection', null);
  // socket.emit('connection', null);
  socket.on("joined", ({ userX }) => {
    users[socket.id] = userX;
    console.log(`${userX} joined`);
    let a = socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: ` ${users[socket.id]} has joined`,
    });
    console.log(a);
    socket.emit("welcome", {
      user: "Admin",
      message: `Welcome to the chat ${users[socket.id]} `,
    });
  });

  socket.on("message", ({ message, id }) => {
    io.emit("sendMessage", { user: users[socket.id], message, id });
  });

  socket.on("disconnectt", () => {
    socket.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]} has left`,
    });
    console.log(`${users[socket.id]}  left`);
  });
});

// io.on("connection",(socket)=>{

//     socket.on("joined",({user})=>{
//         user[socket.id]=user;
//         console.log(`${user} has joined `);
//         socket.broadcast.emit("userJoined",{user:"Admin",message:` ${user} has joined`});
//         socket.emit("welcome",{user:"Admin",message:`Welcome to the chat,${user} `})
//     }
//     )
//     socket.on("message",({message,id})=>{
//         io.emit("sendMessage",{user:user[id],message,id});
//     }
//     )
//     socket.on("disconnect",()=>{
//         socket.broadcast.emit("leave",{user:"Admin",message:`${user[socket.id]}  has left`});
//         console.log(`user left`);
//     }
//     )
// })

// app.listen(port, () => {
//   console.log(`app is running on port ${port}`);
// });
