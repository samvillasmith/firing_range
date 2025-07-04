import { Server } from "@colyseus/core";
import { WebSocketTransport } from "@colyseus/ws-transport";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { HeroArenaRoom } from "./rooms/HeroArenaRoom";

const PORT = Number(process.env.PORT);          // ⬅️  **no fallback**

const app = express();
app.use(cors());
app.use(express.json());

// health probe
app.get("/", (_, res) => res.sendStatus(200));

const httpServer = createServer(app);

const gameServer = new Server({
  transport: new WebSocketTransport({ server: httpServer }),
});

gameServer.define("hero_arena", HeroArenaRoom);

gameServer.listen(PORT).then(() => {
  console.log(`✅ Listening on ws://localhost:${PORT}`);
  if (typeof process.send === "function") process.send("ready");
});
