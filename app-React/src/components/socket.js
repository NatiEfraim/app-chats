import React, { useRef,useEffect,useState } from 'react'
import { io } from 'socket.io-client'
// diffine uniqe id 
const userId=Date.now();




export default function Socket() {
  const [arr_items,setArr]=useState([]);
  const inputRef=useRef();
  const socket=io("http://localhost:3001/")
  // diffine useefect for listen event from socket
  useEffect(()=>{
    socket.on("nodeProEvent",onServerListen);
    return ()=>{
      // once you out of the page stop listen
      socket.off("nodeProEvent",onServerListen);
    }
  })
  const onServerListen=(_item)=>{
    console.log(_item);
    setArr([...arr_items,_item]);///update the new item
  }
  // diffine function to listen to the form
  const onSub=(e)=>{
    e.preventDefault();
    // create obj - with id and item
    const item={
      msg:inputRef.current.value,
      id:userId
    }
    // console.log(inputRef.current.value);
    // send item to the socket
    console.log(item);//testing
    socket.emit("clientProEvent",item)
    inputRef.current.value="";
  }
  return (
    <div className="container">
    <h1>Socket React test</h1>
    <form onSubmit={onSub} id="id_form" className="col-md-4 d-flex align-items-center">
      <label>Message:</label>
      <input ref={inputRef} className="form-control" id="id_input" />
      <button className="btn btn-dark">Send</button>
    </form>
    <div className="border col-md-4 mt-3 p-2" style={{minHeight: "400px"}} id="div_message">
      {arr_items.map((item,i)=>{
        const color=item.id==userId ? "green" : "silver";
        return(
          <h3 style={{color:color}} key={i}> {item.msg}</h3>
        )
      })}
    </div>
  </div>
  )
}
