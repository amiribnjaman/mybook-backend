const express = require("express");
const app = express();
const cors = require("cors");

const http = require("http");
const server = http.createServer(app);
const cookieParser = require("cookie-parser");
require("./config/db");
const userRouter = require("./route/user.router");
const postRouter = require("./route/post.router");
const chatRouter = require("./route/chat.router");
// const { initSocket } = require("./middleware/socket.js");

const corsOptions = {
  origin: true,
  credentials: true,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Cors origin settings
app.use(
  cors({
    origin: ["http://localhost:3000", "https://knectt.netlify.app/"],
    credentials: true,
  })
);

// INITIALIZED SOCKET.IO
// initSocket(server);

// Application Routes
// User route
app.use("/api/user", userRouter);
// Post route
app.use("/api/post", postRouter);
// Chat route
app.use("/api/chat", chatRouter);

// Testing route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "All right",
  });
});

// Handling url error
app.use((req, res, next) => {
  res.status(404).json({
    message: "Bad request",
  });
});

// Handling server error
app.use((error, req, res, next) => {
  res.status(500).json({
    message: "Internal problem",
  });
});

module.exports = app;
