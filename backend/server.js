
require("dotenv").config();

const app = require("./src/app");
const connectToDB = require("./src/db/db");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`Moody-Player server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
