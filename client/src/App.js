
import React from 'react';
import Chat from './componets/Chat/Chat';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from './componets/user/user';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"

function App() {

  // const soc = socketIo('http://localhost:4000',{transports:['websocket']});
  // soc.on("connect",() => {
  //   console.log("connected");


  // }

  // );

  return (

    <BrowserRouter>
        <Routes>

          <Route path="/" element={<User/>} />
          <Route path="/chat" element={<Chat/>} />

        </Routes>
        <ToastContainer/>
    </BrowserRouter>


  );
}

export default App;
