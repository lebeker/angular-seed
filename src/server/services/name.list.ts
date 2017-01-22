import * as express from "express";
import * as redis from "redis";

let nameData = require("../data/name.list.json");

export function nameList(app: any) {

  /**
   * Get name list.
   * @static
   */
  app.get("/api/name-list/static",
    (req: any, res: any, next: any) => {

      res.json(nameData);
    });

  /**
   * Get name list.
   * @database
   */
  app.get("/api/name-list",
    (req: any, res: any, next: any) => {

      let redisClient = redis.createClient(),
          nameList: string[] = [];

        redisClient.smembers("name-list",
        (err: any, replies: any) => {
          console.log(`
          Reply length: ${replies.length}. 
          Reply: ${replies}.`);
          nameList = replies;
          res.json(nameList);
      });

        redisClient.quit();
    });

  /**
   * Add new name.
   * @database
   */
  app.post("/api/name-list",
    (req: any, res: any, next: any) => {

      let redisClient = redis.createClient(),
          request = req.body;
          // request = JSON.parse(req.body);

        redisClient.sadd("name-list", request.name,
        (err: any, replies: any) => {
          console.log(`
          Reply: ${replies}.`);

          res.json({success: true});
        });

        redisClient.quit();
    });

  /**
   * Delete name.
   * @database
   */
  app.delete("/api/name-list",
    (req: any, res: any, next: any) => {

      let redisClient = redis.createClient(),
          request = req.body;
          // request = JSON.parse(req.body);

        redisClient.srem("name-list", request.name,
        (err: any, replies: any) => {
          console.log(`
          Reply length: ${replies.length}. 
          Reply: ${replies}.`);

          res.json({success: true});
        });

        redisClient.quit();
    });

}
