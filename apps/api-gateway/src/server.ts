import { App } from "./app";
import env from "./config/env";
import { redisClient } from "@repo/redis";


const startServer = async () => {
    try {

        await redisClient.ping();
        const app = new App(env.PORT);
        app.listen();

    } catch (error) {
        console.error("Failed to connect Server:", error);
    }
}

startServer()