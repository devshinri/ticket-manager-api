import { Router } from "express";
import {
  createTicket,
  getTicketById,
  getTickets,
  updateTicketStatus,
} from "../controllers/ticket.controller.js";

export const ticketRouter = Router();

ticketRouter.get("/", getTickets);
ticketRouter.get("/:id", getTicketById);
ticketRouter.post("/", createTicket);
ticketRouter.patch("/:id/status", updateTicketStatus);
