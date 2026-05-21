import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import healthRoute from "./routes/healthRoute";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/health", healthRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Task Manager API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});