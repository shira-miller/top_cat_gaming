// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connectDB } from "./db/connect.js";
// import userRoutes from "./routes/user_routes.js";

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// connectDB();

// app.get("/", (req, res) => {
//   res.send("API is running!");
// });

// app.use("/api/users", userRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./db/connect.js";
import userRoutes from "./routes/user_routes.js";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.use("/", userRoutes);

app.use(express.static(path.join(__dirname, "client/build")));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
