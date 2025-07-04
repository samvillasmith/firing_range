// src/rooms/HeroArenaRoom.ts
import { Schema, type, MapSchema } from "@colyseus/schema";   // ← MapSchema added
import { Room, Client } from "@colyseus/core";

// ---------------------------------------------------------------------------
// 1. State definition --------------------------------------------------------
export class Player extends Schema {
  @type("number") x: number = 0;
  @type("number") y: number = 0;
}

export class GameState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
}

// ---------------------------------------------------------------------------
// 2. Room implementation -----------------------------------------------------
export class HeroArenaRoom extends Room<GameState> {
  onCreate() {
    this.setState(new GameState());

    this.onMessage("move", (client: Client, data: { x: number; y: number }) => {
      const p = this.state.players.get(client.sessionId);
      if (p) {
        p.x = data.x;
        p.y = data.y;
      }
    });
  }

  onJoin(client: Client) {
    this.state.players.set(client.sessionId, new Player());
    console.log(client.sessionId, "joined");
  }

  onLeave(client: Client) {
    this.state.players.delete(client.sessionId);
    console.log(client.sessionId, "left");
  }
}
