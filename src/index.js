import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";

dotenv.config();

const PORT = process.env.PORT || 8001;

const app = express();

connectDB()
  .then(
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(`Error Occured at index.js: ${err}`));
