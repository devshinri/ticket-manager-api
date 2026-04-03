import type { Request, Response } from "express";
import { authService } from "../services/auth.service.js";

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

export async function login(req: Request, res: Response) {
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

    const result = await authService.login(email, password);

    if (!result) {
      return res.status(401).json({
        message: "invalid email or password",
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    const serialized = serializeError(error);
    console.error("login error:", serialized);
    return res.status(500).json(serialized);
  }
}
