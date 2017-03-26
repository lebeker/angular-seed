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
        redisClient.sadd("scientist",
            "Eoodsger Dijkstra",
            "Dooonald Knuth",
            "Alan Turing",
            "Grace Hopper",
            redis.print);

        redisClient.quit();
    });
}
