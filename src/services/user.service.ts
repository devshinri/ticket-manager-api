import { prisma } from "../lib/prisma.js";
import { createHash } from "node:crypto";

function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

export const userService = {
  async getUsers() {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
      orderBy: {
        id: "asc",
      },
    });
  },

  async createUser(email: string, password: string) {
    return prisma.user.create({
      data: {
        email,
        passwordHash: hashPassword(password),
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });
  },
};
