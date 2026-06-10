import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// You already have these imports — just add the 2 lines below them

const __filename = fileURLToPath(import.meta.url);  // ← add this
const __dirname = path.dirname(__filename);           // ← add thi


//import xss from 'xss-clean'
import {
  PORT,
  DATABASE_URL,
  JWT_KEY,
  JWT_EXPIRED_TIME,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_SECURITY,
  EMAIL_USER,
  EMAIL_PASSWORD,
  WEB_CACHE,
  MAX_JSON_SIZE,
  REQUEST_TIME,
  REQUEST_NUMBER,
} from "./src/config/config.js";
import router from "./src/routes/api.js";

const app = express();
const port = PORT;

// APP MIDDLEWARES


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(rateLimit({
  windowMs: REQUEST_TIME,
  max: REQUEST_NUMBER,
  message: "Too many requests from this IP, please try again in a minute",
}));

// Routes — API first
app.use("/api", router);

// Static frontend
app.use(express.static(path.join(__dirname, "client", "dist")));

// Catch-all for React Router — excludes /api paths
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});


//web cache
app.set("cache", WEB_CACHE);
//connect to database
mongoose
  .connect(DATABASE_URL, { autoIndex: true })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("database error err");
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});