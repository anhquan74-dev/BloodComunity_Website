import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/index";
import connectDB from "./config/connectDB";
// const swaggerUI = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");
// import cors from "cors";
require("dotenv").config();
console.log("hello world!");
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

// swagger
// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Library API",
//       version: "1.0.0",
//       description: "API documentation",
//     },
//     servers: [
//       {
//         url: "http://localhost:8080",
//       },
//     ],
//   },
//   apis: ["./route/*.js"],
// };

// const specs = swaggerJsDoc(options);
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// // config app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

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

io.on("connection", (socket) => {
  console.log("co nguoi ket noi: ", socket.id);
  console.log("tat ca rooms ", socket.adapter.rooms);
  // 4 room
  socket.on("join room", (user) => {
    console.log("user ket noi: ", user.roleId, user.id);
    console.log(user.roleId);
    console.log(user.groupBlood);
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
    socket.phong = user.groupBlood;

    console.log("tat ca rooms after join", socket.adapter.rooms);
    socket.on("send blood request", (user) => {
      io.sockets.in(socket.phong).emit("recieve blood request", user);
    });

    socket.on("donor confirm", (user) => {
      io.sockets.in(socket.phong).emit("recieve donor confirm", user);
    });
  });
  // socket.on("send request blood group", (data) => {
  //   // socket.join(room);
  //   console.log(
  //     "Recipient send blood request: " + data.id + " ",
  //     data.groupBlood
  //   );
  //   io.sockets.emit("receive blood request", data);
  // });

  // ngat ket noi
  socket.on("disconnect", function () {
    console.log(socket.id, " ngat ket noi");
  });
});

// } else if (user.roleId === "R3") {
//   switch (user.groupBlood) {
//     case "o":
//       socket.join("room o");
//       socket.join("room a");
//       socket.join("room b");
//       socket.join("room ab");
//       break;
//     case "a":
//       socket.join("room a");
//       socket.join("room ab");
//       break;
//     case "b":
//       socket.join("room b");
//       socket.join("room ab");
//       break;
//     case "ab":
//       socket.join("room ab");
//       break;
//     default:
//       break;
//   }
// }
