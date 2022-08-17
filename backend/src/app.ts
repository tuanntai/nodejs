import { Server } from "./Server";
import dotenv from "dotenv";
import mongoose from "mongoose";
import config from "./config/database";
import logging from "./config/logging";

const NAMESPACE = "Server";

/**
 * Application class.
 * @description Handle init config and components.
 */
dotenv.config({
  path: ".env",
});

mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then((result) => {
    logging.info(NAMESPACE, "connected to MongoDB!");
  })
  .catch((error) => {
    logging.error(NAMESPACE, error.message, error);
  });

export class Application {
  server: Server;

  init() {
    this.initServer();
  }

  private initServer() {
    this.server = new Server();
  }

  start() {
    ((port = process.env.APP_PORT || 5000) => {
      this.server.app.listen(port, () =>
        console.log(`> Listening on port ${port}`)
      );
      this.server.app.use("/api", this.server.router);
    })();
  }
}
