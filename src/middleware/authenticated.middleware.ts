import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/token";
import UserModel from "@/resources/user/user.model";
import Token from "@/utils/interfaces/token.interface";
import jwt from "jsonwebtoken";
import httpException from "@/utils/exceptions/http.exception";

async function authenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return next(new httpException(401, "Unauthorized"));
  }

  const accessToken = bearer.split("Bearer ")[1].trim();

  try {
    const payload: Token | jwt.JsonWebTokenError = await verifyToken(
      accessToken
    );
    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new httpException(401, "Unauthorized"));
    }

    const user = await UserModel.findById(payload.id)
      .select("-password")
      .exec();

    if (!user) {
      return next(new httpException(401, "Unauthorized"));
    }

    req.user = user;

    return next();
  } catch (error: any) {
    return next(new httpException(401, "Unauthorized"));
  }
}

export default authenticatedMiddleware;
