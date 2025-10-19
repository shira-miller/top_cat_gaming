import express from "express";
import path from "path";
import http from "http";
import cors from "cors";
import { routesInit } from "./routes/config_routes.js";
import "./db/connect.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

routesInit(app);

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
