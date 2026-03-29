import { prisma } from "../lib/prisma.js";

export const ticketService = {
  async getTickets() {
    return prisma.ticket.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });
  },

  async getTicketById(id: number) {
    return prisma.ticket.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  },

  async createTicket(title: string, content: string, authorId: number) {
    return prisma.ticket.create({
      data: {
        title,
        content,
        authorId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  },

  async updateTicketStatus(id: number, status: string) {
    return prisma.ticket.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        title: true,
        content: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  },
};
