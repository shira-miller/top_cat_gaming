import express from "express";
import path from "path";
import http from "http";
import cors from "cors";
import { routesInit } from "./routes/config_routes.js";
import "./db/connect.js";
import { fileURLToPath } from "url";

// __dirname ב‑ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// יצירת אפליקציה
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
routesInit(app);

// יצירת שרת HTTP
const server = http.createServer(app);

// Port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
