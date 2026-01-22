import http from "http";
import app from "./src/app.js";
import { Server } from "socket.io";
import cors from "cors";
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://restaurant-app-gold-three.vercel.app",
    ],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New user connected", socket.id);
});

io.emit("order", { orderId: 1, amount: 200 });

const port = process.env.PORT || 4000;
server.listen(port, "0.0.0.0", () => {
  console.log(`Server is Running on Port: ${port}"`);
});
