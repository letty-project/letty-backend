import http from "http";
import {
  app,
} from "./app";

const server = http.createServer(app);
const port = 4000;

server.listen(port, () => {
  console.info(`The application started at ${port}`);
});
