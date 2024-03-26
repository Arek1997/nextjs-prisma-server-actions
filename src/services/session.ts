import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export default function Session() {
  const SESSION_KEY = "session";
  const secretKey: string = process.env.JWT_SECRET!;
  const expiresInSecond = 3600 as const; // 1h

  function create(data: any) {
    const session = jwt.sign(data, secretKey, {
      expiresIn: expiresInSecond,
    });

    const expires = new Date(Date.now() + expiresInSecond * 1000); // 1h from now
    return cookies().set(SESSION_KEY, session, { expires, httpOnly: true });
  }

  function get(key: string = SESSION_KEY) {
    return cookies().get(key)?.value;
  }

  function destroy(key: string = SESSION_KEY) {
    cookies().delete(key);
  }

  return { create, get, destroy };
}
