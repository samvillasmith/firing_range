import { Room, Client } from "@colyseus/core";
import { Schema, type, MapSchema } from "@colyseus/schema";

class Player extends Schema {
  @type("number") x = 0;
  @type("number") y = 0;
  @type("number") z = 0;
  @type("number") health = 100;
}

class GameState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
}

export class HeroArenaRoom extends Room<GameState> {
  maxClients = 12;
  /** ← new way: just declare the initial state */
  state = new GameState();

  onCreate() {
    console.log("Room created!");
    this.onMessage("move", (client: Client, data: { x: number; y: number; z: number }) => {
      const player = this.state.players.get(client.sessionId);
      if (player) Object.assign(player, data);
    });
  }

  onJoin(client: Client) {
    console.log(client.sessionId, "joined!");
    const player = new Player();
    player.x = Math.random() * 10 - 5;
    player.z = Math.random() * 10 - 5;
    this.state.players.set(client.sessionId, player);
  }

  onLeave(client: Client) {
    console.log(client.sessionId, "left!");
    this.state.players.delete(client.sessionId);
  }
}
