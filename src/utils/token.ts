import jwt from "jsonwebtoken";
import { omit } from "lodash";
import Token from "@/utils/interfaces/token.interface";
import User from "@/resources/user/user.interface";
import { privateFields } from "@/resources/user/user.model";

export const createToken = (user: User): string => {
  const payload = omit(user.toJSON(), privateFields);
  return jwt.sign(payload, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: "4h",
  });
};

export const verifyToken = async (
  token: string
): Promise<jwt.VerifyErrors | Token> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err, payload) => {
      if (err) return reject(err);

      resolve(payload as Token);
    });
  });
};

export default { createToken, verifyToken };
