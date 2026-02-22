import http from "http";
import dotenv from "dotenv";
import app from "./src/app.js";
import { Server } from "socket.io";
import ConnectDB from "./src/config/database.js";

dotenv.config();

const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://restaurant-app-gold-three.vercel.app",
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.emit("connected", {
    message: "Socket connected successfully",
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

export { io };

const startServer = async () => {
  try {
    await ConnectDB();

    const PORT = process.env.PORT || 4000;

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

startServer();