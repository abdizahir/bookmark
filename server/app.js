import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
// import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import bookmarkRoutes from "./routes/bookmark.js";
import { setServers } from "node:dns";
setServers(["1.1.1.1", "8.8.8.8"]);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mongoUri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === "production";
const corsMode = String(process.env.CORS_MODE ?? "")
  .trim()
  .toLowerCase();

const app = express();


app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://mern-bookmark-five.vercel.app"
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  }),
);

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization",
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

//   next();
// });

app.use("/api/auth", authRoutes);
app.use("/api/bookmark", bookmarkRoutes);

mongoose.set("strictQuery", false);

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.log("Mongo connection error:", err);
    process.exit(1);
  });
