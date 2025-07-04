import { Room, Client } from "@colyseus/core";
import { Schema, type } from "@colyseus/schema";

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

    // messages from clients → move player
    this.onMessage("move", (client: Client, data: { x: number; y: number }) => {
      const player = this.state.players.get(client.sessionId);
      if (player) {
        player.x = data.x;
        player.y = data.y;
      }
    });
  }

  onJoin(client: Client) {
    const player = new Player();
    this.state.players.set(client.sessionId, player);
    console.log(client.sessionId, "joined");
  }

  onLeave(client: Client) {
    this.state.players.delete(client.sessionId);
    console.log(client.sessionId, "left");
  }
}
