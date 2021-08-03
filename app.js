require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
cron = require("node-cron");
const cors = require("cors");
const port = process.env.PORT || 5000;
const morgan = require("morgan");
const connection = require("./src/db/conn");
const Emitter = require("events");
const cookieParser = require("cookie-parser");

// const static_path = path.join(__dirname, "../public");

// app.use(express.static(static_path));
// !event emitter
const EventEmitter = new Emitter();

app.set("eventemitter", EventEmitter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.of("/api/socket").on("connection", (socket) => {
  console.log("socket.io: User connected: ", socket.id);

  socket.on("join", (email) => {
    console.log("socket.io: user join ", email);
  });
});

EventEmitter.on("orderUpdated", (data) => {
  console.log("===============xxxxxxxx", data.email);
  io.of("/api/socket").emit("Updated", data);
});


EventEmitter.on("orderPlaced", (deviceData) => {
  console.log("===============xxxxxxxx", deviceData.email);
  io.of("/api/socket").emit("Orderd", deviceData);
});
const authRoutes = require("./src/routes/auth.route");
const userRouter = require("./src/routes/user.route");
app.use("/api", authRoutes);
app.use("/api", userRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// var request = require("request");
// var options = {
//   method: "POST",
//   url: "https://prod.aadhaarapi.com/pan-lite",
//   headers: {
//     "Content-Type": "application/json",
//     qt_api_key: "{{qt_api_key_value}}",
//     qt_agency_id: "{{qt_agency_id}}",
//   },
//   body: JSON.stringify({
//     pan: "<<pan number>>",
//     consent: "Y",
//     consent_text: "<<consent text>>",
//   }),
// };
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });
// // Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder

// app.use(express.static(path.join(__dirname, 'client/build')));

// const authRoutes = require('./src/routes/auth.route')
// const userRouter = require('./src/routes/user.route')
// app.use('/api', authRoutes);
// app.use('/api', userRouter)

//   app.get('*', (req, res) => {
//    res.sendFile(path.join(__dirname + 'client/build/index.html'));
//   });
// }else{

// const authRoutes = require('./src/routes/auth.route')
// const userRouter = require('./src/routes/user.route')
// app.use('/api', authRoutes);
// app.use('/api', userRouter)

// }

server.listen(port, () => {
  console.log(`listenig the port at ${port}`);
});
// https://www.bootdey.com/react-native-snippets