const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const documentRoutes = require("./routes/document");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const Firebase = require("./config/firebase");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Socket.io setup
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("document-update", (data) => {
    socket.broadcast.emit("document-update", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Data");
});

// Database connection
const PORT = process.env.PORT || 8080;
console.log(process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongodb connection error:", err));

// Firebase initialization
Firebase();

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
