import { Client, Room } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema";

/* ────────  Schema definitions ──────── */
export class Player extends Schema {
  @type("number") x = 0;
  @type("number") z = 0;
}

export class GameState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
}

/* ────────  Room implementation ──────── */
export class HeroArenaRoom extends Room<GameState> {

  onCreate(/* options */): void {
    this.setState(new GameState());

    // receive movement from a client
    this.onMessage("move", (client, { x, z }: { x: number; z: number }) => {
      const p = this.state.players.get(client.sessionId);
      if (p) { p.x = x; p.z = z; }
    });
  }

  onJoin(client: Client): void {
    this.state.players.set(client.sessionId, new Player());
  }

  onLeave(client: Client): void {
    this.state.players.delete(client.sessionId);
  }

  onDispose(): void {
    console.log(`Room ${this.roomId} disposed`);
  }
}
