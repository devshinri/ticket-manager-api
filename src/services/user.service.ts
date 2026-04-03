import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

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

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async createUser(email: string, password: string) {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    return prisma.user.create({
      data: {
        email,
        passwordHash
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });
  },
  async verifyPassword(password: string, passwordHash: string) {
    return bcrypt.compare(password, passwordHash);
  },
};
