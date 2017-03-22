import * as redis from "redis";

/**
 * Init Names List.
 */
export function Init() {

    let redisClient = redis.createClient();
    redisClient.on("error", (err: Error) => {
        console.log("\u001B[31m" + err.message + "\u001B[0m");
        redisClient.quit();
    });
    redisClient.on("ready", () => {
        console.log("\u001B[33m" + 'REDIS READY' + "\u001B[0m");
        redisClient.sadd("name-list",
            "Edsger Dijkstra",
            "Doonald Knuth",
            "Alan Turing",
            "Grace Hopper",
            redis.print);

        redisClient.quit();
    });
}
