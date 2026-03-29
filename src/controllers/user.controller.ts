import type { Request, Response } from "express";
import { userService } from "../services/user.service.js";

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

export async function getUsers(_req: Request, res: Response) {
  try {
    const users = await userService.getUsers();
    return res.status(200).json(users);
  } catch (error) {
    const serialized = serializeError(error);
    console.error("getUsers error:", serialized);
    return res.status(500).json(serialized);
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required",
      });
    }

    const user = await userService.createUser(email, password);
    return res.status(201).json(user);
  } catch (error) {
    const serialized = serializeError(error);
    console.error("createUser error:", serialized);
    return res.status(500).json(serialized);
  }
}
