import jwt from "jsonwebtoken";
import { userService } from "./user.service.js";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not set");
}

export const authService = {
  async login(email: string, password: string) {
    const user = await userService.findUserByEmail(email);

    if (!user) {
      return null;
    }

    const isValidPassword = await userService.verifyPassword(
      password,
      user.passwordHash
    );

    if (!isValidPassword) {
      return null;
    }

    const token = jwt.sign(
      {
        sub: String(user.id),
        email: user.email,
      },
      jwtSecret,
      { expiresIn: "1h" }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  },
};
