import { Room, Client } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
  @type("string") id: string;
  @type("number") x: number = 0;
  @type("number") y: number = 0;
  @type("number") z: number = 0;
  @type("number") health: number = 100;
  @type("string") hero: string = "tank";
  @type("number") team: number = 0;
}

export class GameState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
}

export class HeroArenaRoom extends Room<GameState> {
  maxClients = 12;

  onCreate() {
    this.setState(new GameState());
    
    // Handle player movement
    this.onMessage("move", (client, data) => {
      const player = this.state.players.get(client.sessionId);
      if (player) {
        player.x = data.x;
        player.y = data.y;
        player.z = data.z;
      }
    });

    // Handle shooting
    this.onMessage("shoot", (client, data) => {
      // Broadcast to all clients
      this.broadcast("playerShot", {
        playerId: client.sessionId,
        direction: data.direction
      }, { except: client });
    });

    // Game loop (20 Hz)
    this.setSimulationInterval(() => this.update());
  }

  onJoin(client: Client) {
    console.log(client.sessionId, "joined!");
    
    const player = new Player();
    player.id = client.sessionId;
    player.x = Math.random() * 10 - 5;
    player.z = Math.random() * 10 - 5;
    player.team = this.state.players.size % 2; // Auto team balance
    
    this.state.players.set(client.sessionId, player);
  }

  onLeave(client: Client) {
    console.log(client.sessionId, "left!");
    this.state.players.delete(client.sessionId);
  }

  update() {
    // Game logic here (physics, health, etc)
  }
}