// app of socket
const ioSocket=require("socket.io");
// diffine function and exports
exports.createSocket=(server)=>{
    const io=ioSocket(server,{
        cors:"*",///all can connection
        methods:["GET","POST"]///req of POST/GET
    })
    // listen for any connection
    io.on("connection",(socket)=>{
        console.log("there is connctions from user");
        // listen to any event from client - send msg
        socket.on("clientEvent",(msg)=>{
            console.log(msg);
            // send msg all who is connected to the socket
            io.sockets.emit("nodeEvent","new msg: "+msg)
        })
        // listen to any event from client - send obj
            socket.on("clientProEvent",(obj)=>{
                console.log(obj);
                // send obj all who is connected to the socket
                io.sockets.emit("nodeProEvent",obj)
        })
    })
}