import { Room, Client } from "@colyseus/core";
import { MapSchema, Schema, type } from "@colyseus/schema";

/* ──────── Schema objects ──────── */
export class PlayerState extends Schema {
  @type("number") x = 0;
  @type("number") y = 0;
  @type("number") z = 0;
}

export class GameState extends Schema {
  @type({ map: PlayerState }) players = new MapSchema<PlayerState>();
}

/* ──────── Room ──────── */
export class HeroArenaRoom extends Room<GameState> {
  maxClients = 16;

  onCreate() {
    this.setState(new GameState());
  }

  onJoin(client: Client) {
    const player = new PlayerState();
    this.state.players.set(client.sessionId, player);
  }

  onLeave(client: Client) {
    this.state.players.delete(client.sessionId);
  }

  // example patch handler
  onMessage(client: Client, data: any) {
    const p = this.state.players.get(client.sessionId);
    if (!p) return;

    if (data.move) {
      p.x += data.move.x;
      p.y += data.move.y;
      p.z += data.move.z;
    }
  }
}
