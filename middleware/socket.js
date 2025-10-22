import { Server } from "socket.io";

// const {Server} = require('socket.io')
export const initSocket = (server) => {
  let io;
  let users;

  // CREATE SOCKET SERVER
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PATCH"],
    },
  });

  // SOCKET CONNECTION
  io.on(
    ("connection",
    (socket) => {
      console.log("new uer connected", socket.id);

      // USER JOINS
      socket.on("addUser", (userId) => {
        if (!users.some((u) => u.userId == userId)) {
          users.push({ userId, socketId: socket.id });
        }

        console.log("users", users);
        io.emit("getUsers", users);
      });

      // SEND MESSAGE
      socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const receiver = users.find((u) => u.userId == receiverId);

        io.to(receiver.socketId).emit("getMessage", {
          senderId: senderId || "",
          text: text || "",
          createdAt: new Date(),
        });
      });

      // SERVER DISCONNET
      socket.on("disconnet", () => {
        users = users.filter((u) => u.socketId != socket.id);
        console.log("user disconnected", socket.id);
        io.emit("getUser", users);
      });
    })
  );

  return io;
};
