import { Room, Client } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
  @type("number") x: number = 0;
  @type("number") y: number = 0;
  @type("number") z: number = 0;
  @type("number") health: number = 100;
}

export class GameState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
}

export class HeroArenaRoom extends Room<GameState> {
  maxClients = 12;

  onCreate() {
    this.setState(new GameState());
    console.log("Room created!");

    this.onMessage("move", (client, data) => {
      const player = this.state.players.get(client.sessionId);
      if (player) {
        player.x = data.x;
        player.y = data.y;
        player.z = data.z;
      }
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