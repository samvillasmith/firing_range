import { Server } from "colyseus";
import { createServer } from "http";
import express from "express";
import { HeroArenaRoom } from "./rooms/HeroArenaRoom";

const port = Number(process.env.PORT || 2567);
const app = express();

app.use(express.json());

const server = createServer(app);
const gameServer = new Server({
  server,
});

// Register your room
gameServer.define("hero_arena", HeroArenaRoom);

gameServer.listen(port);
console.log(`Listening on ws://localhost:${port}`);