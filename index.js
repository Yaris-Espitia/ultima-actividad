const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("Server listening at port", port);
});

app.use(express.static(path.join(__dirname, "public")));

// Chatroom

let numUsers = 0;

io.on("connection", (socket) => {
  let addedUser = false;

  socket.on("new message", (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit("new message", {
      username: socket.username,
      message: data,
    });
  });
  
  zócalo . on ( "asistente" ,  ( )  =>  {
    zócalo . difusión . emit ( "asistiendo" ,  {
      nombre de usuario : socket . nombre de usuario ,
    } ) ;


  socket.on("add user", (username) => {
    if (addedUser) return;

    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit("login", {
      numUsers: numUsers,
    });

    socket.broadcast.emit("user joined", {
      username: socket.username,
      numUsers: numUsers,
    });
  });

  socket.on("typing", () => {
    socket.broadcast.emit("typing", {
      username: socket.username,
    });
  });

  socket.on("stop typing", () => {
    socket.broadcast.emit("stop typing", {
      username: socket.username,
    });
  });

  socket.on("disconnect", () => {
    if (addedUser) {
      --numUsers;

      socket.broadcast.emit("user left", {
        username: socket.username,
        numUsers: numUsers,
      });
    }
  });
});
