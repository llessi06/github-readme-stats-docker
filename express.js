import "dotenv/config";
import statsCard from "./api/index.js";
import repoCard from "./api/pin.js";
import langCard from "./api/top-langs.js";
import wakatimeCard from "./api/wakatime.js";
import gistCard from "./api/gist.js";
import express from "express";

const app = express();
const port = process.env.PORT || process.env.port || 9000;

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.get("/", statsCard);
app.get("/pin", repoCard);
app.get("/top-langs", langCard);
app.get("/wakatime", wakatimeCard);
app.get("/gist", gistCard);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}, awaiting requests`);
});

process.on("SIGTERM", () => {
  console.log("stopping, received SIGTERM signal");
  server.close(() => {
    console.log("server stopped gracefully");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("stopping, received SIGINT signal");
  server.close(() => {
    console.log("server stopped gracefully");
    process.exit(0);
  });
});
