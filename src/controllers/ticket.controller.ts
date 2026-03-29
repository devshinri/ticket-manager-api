import type { Request, Response } from "express";
import { ticketService } from "../services/ticket.service.js";

function serializeError(error: unknown) {
  if (typeof error === "object" && error !== null) {
    const e = error as {
      name?: string;
      message?: string;
      stack?: string;
      code?: string;
      meta?: unknown;
      clientVersion?: string;
    };

    return {
      name: e.name,
      message: e.message,
      code: e.code,
      meta: e.meta,
      clientVersion: e.clientVersion,
      stack: e.stack,
    };
  }

  return { message: String(error) };
}

function parseId(value: string): number | null {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

const ALLOWED_STATUSES = ["open", "in_progress", "done"] as const;

export async function getTickets(_req: Request, res: Response) {
  try {
    const tickets = await ticketService.getTickets();
    return res.status(200).json(tickets);
  } catch (error) {
    const serialized = serializeError(error);
    console.error("getTickets error:", serialized);
    return res.status(500).json(serialized);
  }
}

export async function getTicketById(req: Request, res: Response) {
  try {
    const rawId = req.params.id;

    if (typeof rawId !== "string") {
      return res.status(400).json({
        message: "valid ticket id is required",
      });
    }

    const id = parseId(rawId);

    if (!id) {
      return res.status(400).json({
        message: "valid ticket id is required",
      });
    }

    const ticket = await ticketService.getTicketById(id);

    if (!ticket) {
      return res.status(404).json({
        message: "ticket not found",
      });
    }

    return res.status(200).json(ticket);
  } catch (error) {
    const serialized = serializeError(error);
    console.error("getTicketById error:", serialized);
    return res.status(500).json(serialized);
  }
}

export async function createTicket(req: Request, res: Response) {
  try {
    const { title, content, authorId } = req.body as {
      title?: string;
      content?: string;
      authorId?: number;
    };

    if (!title || !content || typeof authorId !== "number") {
      return res.status(400).json({
        message: "title, content and authorId are required",
      });
    }

    const ticket = await ticketService.createTicket(title, content, authorId);
    return res.status(201).json(ticket);
  } catch (error) {
    const serialized = serializeError(error);
    console.error("createTicket error:", serialized);
    return res.status(500).json(serialized);
  }
}

export async function updateTicketStatus(req: Request, res: Response) {
  try {
    const rawId = req.params.id;

    if (typeof rawId !== "string") {
      return res.status(400).json({
        message: "valid ticket id is required",
      });
    }

    const id = parseId(rawId);
    const { status } = req.body as { status?: string };

    if (!id) {
      return res.status(400).json({
        message: "valid ticket id is required",
      });
    }

    if (
      !status ||
      !ALLOWED_STATUSES.includes(
        status as (typeof ALLOWED_STATUSES)[number]
      )
    ) {
      return res.status(400).json({
        message: `status must be one of: ${ALLOWED_STATUSES.join(", ")}`,
      });
    }

    const existingTicket = await ticketService.getTicketById(id);

    if (!existingTicket) {
      return res.status(404).json({
        message: "ticket not found",
      });
    }

    const updatedTicket = await ticketService.updateTicketStatus(id, status);
    return res.status(200).json(updatedTicket);
  } catch (error) {
    const serialized = serializeError(error);
    console.error("updateTicketStatus error:", serialized);
    return res.status(500).json(serialized);
  }
}
