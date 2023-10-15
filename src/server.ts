import http from "http";
import dotenv from "dotenv";
import {
  app,
} from "./app";

dotenv.config();

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
