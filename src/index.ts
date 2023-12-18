import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // logger.info(`Server running on port ${PORT}`)
});

process.on("SIGINT", async () => {
  console.log("shutting down...");

  //   logger.info("Shutting down...");

  // Close any other resources or servers here
  //   logger.info("Goodbye!");
  console.log("goodbye");

  process.exit(0);
});
