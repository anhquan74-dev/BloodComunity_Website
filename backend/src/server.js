import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/index";
import connectDB from "./config/connectDB";
// import cors from "cors";
require("dotenv").config();
let app = express();
// app.use(cors({ origin: true }));
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT;
const server = app.listen(port, () => {
  console.log("Listening on port " + port);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.URL_REACT,
  },
});
let onlineUser = []
io.on("connection", (socket) => {

  socket.on("join_group_blood", (user) => {
    switch (user.groupBlood) {
      case "o":
        socket.join(user.groupBlood);
        break;
      case "a":
        socket.join(user.groupBlood);
        break;
      case "b":
        socket.join(user.groupBlood);
        break;
      case "ab":
        socket.join(user.groupBlood);
        break;
      default:  
        break;
    }
    socket.on('new_request_from_recipient', (newRequestReceived) => {
      socket.in(user.groupBlood).emit('request_received' , newRequestReceived)
    })
    socket.room = user.groupBlood;
    socket.on("donor_confirm_request", (requestConfirmed) => {
      socket.in(user.groupBlood).emit("recieved_donor_confirm", requestConfirmed);
    });
    socket.on("recipient_confirm_request", (requestConfirmedByRecipient) => {
      socket.in(user.groupBlood).emit("recieved_recipient_confirm", requestConfirmedByRecipient);
    })
    socket.on("recipient_delete_request", (requestDeleted) => {
      socket.in(user.groupBlood).emit("recieved_recipient_delete", requestDeleted);
    })
    socket.on("recipient_update_request", (requestUpdated) => {
      socket.in(user.groupBlood).emit("recieved_recipient_update", requestUpdated);
    })
  });

  // ngat ket noi
  socket.on("setup", (userData) => {
    switch (user.groupBlood) {
      case "o":
        socket.join(user.groupBlood);
        break;
      case "a":
        socket.join(user.groupBlood);
        break;
      case "b":
        socket.join(user.groupBlood);
        break;
      case "ab":
        socket.join(user.groupBlood);
        break;
      default:
        break;
    }
  });
  
  socket.on("disconnect", function () {
    console.log("socet id disconnected: ", socket.id);
  });
});

