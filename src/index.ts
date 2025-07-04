import http from "http";
import express, { Express } from "express";

import { Server } from "colyseus";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { monitor } from "@colyseus/monitor";

import { HeroArenaRoom } from "./rooms/HeroArenaRoom";

// ────────────────────────────────────────────────────────────
// 1. Express app & native HTTP server
// ────────────────────────────────────────────────────────────
const app: Express = express();
const port = Number(process.env.PORT) || 2567;

app.get("/", (_req, res) => res.send("Colyseus server up ✅"));

const httpServer = http.createServer(app);

// ────────────────────────────────────────────────────────────
// 2. Colyseus game-server on top of the HTTP server
// ────────────────────────────────────────────────────────────
const gameServer = new Server({
  transport: new WebSocketTransport({ server: httpServer })
});

// register all rooms
gameServer.define("hero_arena", HeroArenaRoom);

// (optional) dashboard at /colyseus
app.use("/colyseus", monitor());

// ────────────────────────────────────────────────────────────
gameServer.listen(port);
console.log(`✅ Listening on ws://localhost:${port}`);
