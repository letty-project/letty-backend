import http from "http";
import {
  promisify,
} from "util";
import {
  app,
} from "./app";

const server = http.createServer(app);
const closeServer = promisify(server.close);
const port = 4000;
const shutdown = async () => {
  try {
    await closeServer();
  } catch (e) {
    console.error(e);
  } finally {
    process.kill(process.pid);
  }
};

server.listen(port, () => {
  console.info(`The application started at ${port}`);
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("SIGUSR2", shutdown);
