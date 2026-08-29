import "dotenv/config";
import { createServer } from "node:http";
import app from "./app.js";
import { connectDB } from "./db.js";
import { logger } from "./logger.js";

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);

async function startServer() {
  httpServer.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
  });

  try {
    await connectDB();
  } catch (err) {
    logger.error(`MongoDB unavailable: ${err.message}`);
  }
}

if (process.env.NODE_ENV !== "test") {
  startServer();
}

export default httpServer;