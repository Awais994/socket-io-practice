import "./msg.css"

import React from 'react'
import ReactAudioPlayer from 'react-audio-player';  
import {useState} from 'react';
import Notifier from "react-desktop-notification";
// import Notifier from "react-desktop-notification"



let audio = new Audio ("not.mp3");




function Messages({ user, message, classs }) {

    // let noti = [[user],[message]];
    // console.log(message)
    // console.log(noti);
    // console.log(noti[0][0]);
    // console.log(noti[1][0]);
    // if((noti.name).length !== 0){
    //     console.log(noti )
    //      Notifier.focus(noti.name, noti.message);
    // }
    // Notifier.focus(user, message);


    // Notifier.focus(ti[0].use, ti[0].msg)
    // console.log(noti[0]);
    // if(user !== ""){
    //     // console.log(user)
    //     // console.log(message)
    //     Notifier.focus(noti[0][0], noti[1][0]);
    // }


    


    if(user){

        return (


            
            <div className={`container ${classs}`} >

                <h3>{user}</h3>
                <p className='left'>{message}</p>
                <span className="time-left">{new Date().toLocaleTimeString()}</span>
                <ReactAudioPlayer
                    src="not.mp3"
                    autoPlay={true}
                />

                {Notifier.focus(user, message)}


            </div>


        )

  
        

    }
    else if(user === ""){
        return (
        <div className="container">
        <h3>You</h3>
        <p className='right'>{message}</p>
        <span className="time-right">{new Date().toLocaleTimeString()}</span>
      </div>
        )

    }


}

export default Messages
