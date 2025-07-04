import { Server } from "@colyseus/core";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { monitor } from "@colyseus/monitor";
import express from "express";
import cors from "cors";
import { HeroArenaRoom } from "./rooms/HeroArenaRoom";

// ─────────────────────────────────────────────────────────────
// PORT guard – prevents NaN && matches local & cloud builds
// ─────────────────────────────────────────────────────────────
const ENV_PORT = process.env.PORT;
const PORT =
  ENV_PORT && !Number.isNaN(Number(ENV_PORT)) && Number(ENV_PORT) > 0
    ? Number(ENV_PORT)
    : 2567;

const app = express();
app.use(cors());

const server = new Server({
  transport: new WebSocketTransport({ server: app }),
});

server.define("hero_arena", HeroArenaRoom);
app.use("/colyseus", monitor());

server
  .listen(PORT)
  .then(() =>
    console.log(`✅ Listening on ws://localhost:${PORT}`))
  .catch((err) => {
    console.error("❌ Failed to start:", err);
    process.exit(1);
  });

