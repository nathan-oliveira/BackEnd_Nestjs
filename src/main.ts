import server from "./data/infrastructure/config/server"

async function createServer() {
  await server.createServer();
}

createServer();
