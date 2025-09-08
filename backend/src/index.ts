import express from "express";
import cors from "cors";
import homeRouter from "./routes/home.route";

const app = express();

// allow frontend requests
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/url", homeRouter);

// Redirect route for shortcodes at root
import { redirectRouter } from "./routes/home.route";
app.use("/", redirectRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
