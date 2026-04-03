import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const jwtSecretEnv = process.env.JWT_SECRET;

if (!jwtSecretEnv) {
  throw new Error("JWT_SECRET is not set");
}

const jwtSecret: string = jwtSecretEnv;

type AuthPayload = {
  sub: string;
  email: string;
};

function isAuthPayload(value: unknown): value is AuthPayload {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const payload = value as Record<string, unknown>;

  return (
    typeof payload.sub === "string" &&
    typeof payload.email === "string"
  );
}

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "authorization token is required",
    });
  }

  const token = authorization.slice("Bearer ".length);

  try {
    const decoded = jwt.verify(token, jwtSecret);

    if (!isAuthPayload(decoded)) {
      return res.status(401).json({
        message: "invalid token payload",
      });
    }

    res.locals.user = {
      id: Number(decoded.sub),
      email: decoded.email,
    };

    return next();
  } catch {
    return res.status(401).json({
      message: "invalid or expired token",
    });
  }
}
