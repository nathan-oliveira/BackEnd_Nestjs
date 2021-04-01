import server from "src/data/infrastructure/config/server"

async function createServer() {
  await server.createServer();
}

createServer();
