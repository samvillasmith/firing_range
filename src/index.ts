import { listen } from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";
import { HeroArenaRoom } from "./rooms/HeroArenaRoom";

export default listen({
    getId: () => "Hero Arena",
    
    initializeGameServer: (gameServer) => {
        gameServer.define('hero_arena', HeroArenaRoom);
    },

    initializeExpress: (app) => {
        app.use("/colyseus", monitor());
    },

    beforeListen: () => {
        console.log("Server is starting...");
    }
});