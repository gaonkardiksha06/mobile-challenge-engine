import "dotenv/config";
import { createServer } from "node:http";
import app from "./app.js";
import { connectDB } from "./db.js";
import { logger } from "./logger.js";

const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);

async function startServer() {
  try {
    await connectDB(); // ✅ Connect MongoDB before listening
    httpServer.listen(PORT, () => {
      // ✅ Use logger, not console.log
      logger.info(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    await logger.error(`DB connection failed: ${error.stack || error.message}`);
    process.exit(1);
  }
}

// ✅ Prevent Playwright conflicts: don’t auto-start in test mode
if (process.env.NODE_ENV !== "test") {
  startServer();
}

export default httpServer;
