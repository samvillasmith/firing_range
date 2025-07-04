import { Server } from "@colyseus/core";
import { WebSocketTransport } from "@colyseus/ws-transport";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { HeroArenaRoom } from "./rooms/HeroArenaRoom";

/* -------------------------------------------------
 * Cloud _may_ send an **empty** PORT env variable,
 * which becomes NaN when cast.  Guard for that.
 * ------------------------------------------------*/
const ENV_PORT = process.env.PORT;
const PORT =
  ENV_PORT && !Number.isNaN(Number(ENV_PORT)) && Number(ENV_PORT) > 0
    ? Number(ENV_PORT)
    : 2567;                              // ← always falls back safely

const app = express();
app.use(cors());
app.use(express.json());

// Kubernetes / LB health-check
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
