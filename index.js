    import express from "express";
    import { createServer } from "node:http";
    import { fileURLToPath} from "node:url";
    import { dirname, join } from "node:path";
    import { Server } from "socket.io"

    const  app = express();
    const server = createServer(app);
    const io = new Server(server)

    const _dirname = dirname(fileURLToPath(import.meta.url));

    app.get("/",(req, res) => {
        res.sendFile(join(_dirname, "index.html"));
    });

    io.on("connection", (socket) => {
        console.log("user is conected " + socket.id);
        socket.on("disconnect", () => {
            console.log("user disconnected " + socket.id)
        })
    });

    io.on('connection', (socket) => {
        socket.on('chat message', (msg) => {
          io.emit('chat message', msg);
        });
      });

    server.listen(3000, "192.168.1.119", () =>{
        console.log("corriendo en enlace http://localhost:3000")
    });