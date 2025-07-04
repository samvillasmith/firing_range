import { Server } from "colyseus";
import { createServer } from "http";
import { monitor } from "@colyseus/monitor";
import express from "express";
import cors from "cors";
import { HeroArenaRoom } from "./rooms/HeroArenaRoom";

const port = Number(process.env.PORT || 2567);
const app = express();

app.use(cors());
app.use(express.json());

// Colyseus monitor
app.use("/colyseus", monitor());

const server = createServer(app);
const gameServer = new Server({
  server,
});

// Register room
gameServer.define("hero_arena", HeroArenaRoom);

gameServer.listen(port);
console.log(`✅ Listening on ws://localhost:${port}`);