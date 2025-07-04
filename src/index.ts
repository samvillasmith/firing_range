import http from "http";
import express from "express";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { Server, matchMaker } from "@colyseus/core";
import { HeroArenaRoom } from "./rooms/HeroArenaRoom";

const app = express();
const server = http.createServer(app);
const gameServer = new Server({
  transport: new WebSocketTransport({ server }),
});

// ---- REGISTER ROOMS --------------------------------------------------------
gameServer.define("hero_arena", HeroArenaRoom);

// ---- CORS HEADERS FOR MATCHMAKER ------------------------------------------
// Docs: https://docs.colyseus.io/recipes/custom-cors-headers
matchMaker.controller.getCorsHeaders = () => ({
  // PlayCanvas launch domains while you test
  "Access-Control-Allow-Origin": "https://launch.playcanvas.com",
  // add your production web-frontends here, or just use "*"
  // "Access-Control-Allow-Origin": "*",
  "Vary": "Origin",
});

// ---- START LISTENING -------------------------------------------------------
const PORT = Number(process.env.PORT || 2567);
gameServer
  .listen(PORT)
  .then(() => console.log(`✅ Colyseus listening on ws://localhost:${PORT}`))
  .catch((err) => {
    console.error("❌ Failed to start Colyseus:", err);
    process.exit(1);
  });
