// diffine connecetion for socket
const socket=io.connect("http://localhost:3001/");


const init=()=>{
declareEvent();
}
const declareEvent=()=>{
    let form_elem=document.querySelector("#id_form");
    let inp_elem=document.querySelector("#id_input");
    form_elem.addEventListener("submit",(e)=>{
        e.preventDefault();
        // send any msg to the socket server
        socket.emit("clientEvent",inp_elem.value);
        // 
    })
    // lisen for any envent from the socket
    socket.on("nodeEvent",(msg)=>{
        document.querySelector("#div_message").innerHTML+=`
        ${msg}<br>
        `
    })
}

init();