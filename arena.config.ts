import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";

/**
 * Import your Room files
 */
import { HeroArenaRoom } from "./src/rooms/HeroArenaRoom";

export default Arena({
    getId: () => "Hero Arena Server",

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('hero_arena', HeroArenaRoom);
    },

    initializeExpress: (app) => {
        /**
         * Use @colyseus/monitor
         * It is recommended to protect this route with a password
         */
        app.use("/colyseus", monitor());
    },

    beforeListen: () => {
        /**
         * Before server is started
         */
    }
});