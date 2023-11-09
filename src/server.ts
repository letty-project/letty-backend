import http from "http";
import {
  app,
} from "./app";
import database from "./database";
import {
  User,
  Post
} from "./core";

database.authenticate().then(() => {
  console.log("connect")
  User.sync();
  Post.sync();
});

const server = http.createServer(app);
const port = parseInt(process.env.PORT || "4000", 10);
const shutdown = async (signals: NodeJS.Signals) => {
  server.close(() => {
    console.log(`The application closed by ${signals}`);
    process.exit(0);
  })
};

server.listen(port, () => {
  console.info(`The application started at ${port}`);
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("SIGUSR2", shutdown);
