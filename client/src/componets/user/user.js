import React from 'react'
import { useState } from 'react';
import "./user.css"
import { Link } from "react-router-dom";


let userX;


const sendUser = () => {
    userX = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = "";
}

function User() {
    const [name, setname] = useState("");
  return (
    <div className="JoinPage">
    <div className="JoinContainer">
        <h1>FAKE CHAT</h1>
        <input onChange={(e) => setname(e.target.value)} placeholder="Enter Your Name" type="text" id="joinInput" />
        <Link onClick={(event) => !name ? event.preventDefault() : null} to="/chat">  <button onClick={sendUser} className="joinbtn">Login In</button></Link>
    </div>
</div>
  )
}

export default User
export { userX }
