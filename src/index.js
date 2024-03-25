import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";

dotenv.config();

const PORT = process.env.PORT || 8001;

const app = express();

// * Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Import Routes
import urlRoutes from "./routes/url.route.js";

// * Routes
app.use("/api/v1", urlRoutes);

connectDB()
  .then(
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(`Error Occured at index.js: ${err}`));
