import { Room, Client } from "@colyseus/core";
import { Schema, type, MapSchema } from "@colyseus/schema";

/* ---------- schema ---------- */
class Player extends Schema {
  @type("number") x = 0;
  @type("number") y = 0;
  @type("number") z = 0;
}

class GameState extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>();
}

/* ---------- room ---------- */
export class HeroArenaRoom extends Room<GameState> {
  maxClients = 12;

  onCreate() {
    // IMPORTANT: initialise state here
    this.setState(new GameState());

    this.onMessage(
      "move",
      (client: Client, data: { x: number; y: number; z: number }) => {
        const p = this.state.players.get(client.sessionId);
        if (p) Object.assign(p, data);
      }
    );
  }

  onJoin(client: Client) {
    const p = new Player();
    this.state.players.set(client.sessionId, p);
  }

  onLeave(client: Client) {
    this.state.players.delete(client.sessionId);
  }
}
