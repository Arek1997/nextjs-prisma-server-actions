import jwt, { SignOptions } from "jsonwebtoken";

export default function Jwt() {
  const SECRET_KEY = process.env.JWT_SECRET!;

  function createToken(data: any, options?: SignOptions) {
    return jwt.sign(data, SECRET_KEY, options);
  }

  function verifyToken(token: string, options?: SignOptions) {
    try {
      return jwt.verify(token, SECRET_KEY, options);
    } catch (error) {
      console.error(
        `verifyToken error: ${error} \n verifyToken token ${token}`
      );
    }
  }

  return { createToken, verifyToken };
}
