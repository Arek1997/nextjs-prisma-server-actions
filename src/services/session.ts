import { cookies } from "next/headers";
import Jwt from "./jwt";

export default function Session() {
  const SESSION_KEY = "session";
  const expiresInSecond = 3600 as const; // 1h

  function create(data: any) {
    const token = Jwt().createToken(data, {
      expiresIn: expiresInSecond,
    });

    const expires = new Date(Date.now() + expiresInSecond * 1000); // 1h from now
    return cookies().set(SESSION_KEY, token, { expires, httpOnly: true });
  }

  function get(key: string = SESSION_KEY) {
    return cookies().get(key)?.value || "";
  }

  function destroy(key: string = SESSION_KEY) {
    cookies().delete(key);
  }

  return { create, get, destroy };
}
