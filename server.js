const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require("mongoose");
const config = require("./config/config")
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
 mongoose.Promise = global.Promise;
  const db = mongoose.connect(config.ssoDB, {});
  console.log("Successfully Connected To MongoDB.");
  mongoose.connection.on("error", (err) => {
    console.log(
      "Error: Could not connect to MongoDB. Did you forget to run `mongod`?".red
    );
  });
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (message) => {
    console.log('Received message:', message);
    io.emit('message', "socket work proper");
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


// app.set("socketio", io);
// io.on("connection", function (socket) {
//   console.log("new connection made!");
//   socket.on("disconnect", function () {
//     console.log("disconnected!");
//   });
// });
app.get("/",async(req,res)=>{
  res.send(`Welcome to SSO Backend API.`)
})

const PORT = config.ssoPort || 3001;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

server.listen(PORT, '0.0.0.0',() => {
  console.info(`sso-server backend  listening on port ${PORT}`);
});
