import { Server } from "@colyseus/core";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { monitor } from "@colyseus/monitor";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { HeroArenaRoom } from "./rooms/HeroArenaRoom";

const port = Number(process.env.PORT || 2567);
const app = express();
app.use(cors());
app.use(express.json());
app.use("/colyseus", monitor());

const server = createServer(app);

const gameServer = new Server({
  transport: new WebSocketTransport({ server }), // re-use the same HTTP server
});

gameServer.define("hero_arena", HeroArenaRoom);
gameServer.listen(port);

console.log(`✅ Listening on ws://localhost:${port}`);