import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import router1 from "./routes/User.js";
import router2 from "./routes/Gallery.cjs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", router1);
app.use("/gallery", router2);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.PORT;
mongoose
  .connect(process.env.URL)
  .then(() => console.log("mongodb connected successfully"))
  .catch((error) => console.log(error.message));
app.listen(PORT, console.log(`server is running on port ${PORT}`));
