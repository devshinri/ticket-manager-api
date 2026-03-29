import express from "express";
import { userRouter } from "./routes/user.routes.js";
import { ticketRouter } from "./routes/ticket.routes.js";

export const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ message: "ok" });
});

app.use("/users", userRouter);
app.use("/tickets", ticketRouter);
