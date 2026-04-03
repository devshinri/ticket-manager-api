import { Router } from "express";
import {
  createTicket,
  getTicketById,
  getTickets,
  updateTicketStatus,
} from "../controllers/ticket.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

export const ticketRouter = Router();

ticketRouter.get("/", getTickets);
ticketRouter.get("/:id", getTicketById);
ticketRouter.post("/", requireAuth, createTicket);
ticketRouter.patch("/:id/status", requireAuth, updateTicketStatus);
