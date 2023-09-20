// diffine library of express
const express = require("express");
// library for files
const path = require("path");
// diffine http protocol
const http = require("http");
// diffine the route init and socket
const {routesInit} = require("./routes/configRoutes")
const {createSocket}=require("./sockets/appSocket")
const app = express();

// use json and alow to get or send msg in json
app.use(express.json());
// diffine public file
app.use(express.static(path.join(__dirname, "public")));
routesInit(app);

// diffine port and http and listen 
const server = http.createServer(app);

const port = process.env.PORT || 3001;
server.listen(port);
// connect to socket
createSocket(server);