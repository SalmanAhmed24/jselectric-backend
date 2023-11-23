const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const usersRoutes = require("./routes/users");
const usersTypeRoutes = require("./routes/userType");
const taxCodeRoutes = require("./routes/taxCode");
const customerTypeRoutes = require("./routes/customerType");
const materialLevelRoutes = require("./routes/materialLevel");
const laborLevelRoutes = require("./routes/laborLevel");
const customerTermRoutes = require("./routes/customerTerm");
const positionRoutes = require("./routes/position");
const deviceRoutes = require("./routes/devices");
const vehicleRoutes = require("./routes/vehicle");
const toolsRoutes = require("./routes/tools");
const toolsCategoryRoutes = require("./routes/toolCategory");
const deviceCategoryRoutes = require("./routes/deviceCategory");
const salesPersonRoutes = require("./routes/salesPerson");
const subtoolsCategoryRoutes = require("./routes/subtoolCategory");
const clientRoutes = require("./routes/client");
const chatRoutes = require("./routes/chat");
const messageRoutes = require("./routes/message");

const url =
  "mongodb+srv://book-a-tutorDB:reactive_007@cluster0.2art5.mongodb.net/jselectric";
mongoose
  .connect(url)
  .then(() => {
    console.log("Connection Established");
  })
  .catch((err) => {
    console.log("error occured while connecting to database", err);
  });

app.use("/api/users", usersRoutes);
app.use("/api/userType", usersTypeRoutes);
app.use("/api/customerType", customerTypeRoutes);
app.use("/api/materialLevel", materialLevelRoutes);
app.use("/api/laborLevel", laborLevelRoutes);
app.use("/api/customerTerm", customerTermRoutes);
app.use("/api/position", positionRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/tools", toolsRoutes);
app.use("/api/toolCategory", toolsCategoryRoutes);
app.use("/api/deviceCategory", deviceCategoryRoutes);
app.use("/api/taxCode", taxCodeRoutes);
app.use("/api/subtoolCategory", subtoolsCategoryRoutes);
app.use("/api/salesPersonCode", salesPersonRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/message", messageRoutes);
const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://jselectric.vercel.app/",
  },
});
io.on("connection", (socket) => {
  console.log("connected to socket.io");
  var userDataMain;
  socket.on("setup", (userData) => {
    userDataMain = userData;
    console.log("!!!!!", userData.id);
    socket.join(userData.id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("##### JOINED ROOM", room);
  });
  socket.on("new message", (newMessageReceived) => {
    console.log("error in newMessage", newMessageReceived);
    var chat = newMessageReceived.chat;
    console.log("here is chat backend", chat);
    if (!chat.users) {
      console.log("chat.users not found");
    }
    chat.users.forEach((user) => {
      console.log("inner user", user);
      if (user._id == newMessageReceived.sender._id) {
        console.log("here in wow", newMessageReceived);
        return;
      }
      console.log("here in not wow", newMessageReceived);
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userDataMain.id);
  });
});
