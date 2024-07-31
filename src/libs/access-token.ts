import { Cookies } from "react-cookie";
import { TimeSpan, createDate } from "oslo";

import { ACCESS_TOKEN_NAME } from "./env";

const COOKIE_NAME = ACCESS_TOKEN_NAME || "access-token-name";

export const accessTokenCookie = new Cookies(null, {
  path: "/",
  sameSite: "none",
  secure: true,
  expires: createDate(new TimeSpan(30, "d")),
});

export const accessToken = {
  get() {
    return accessTokenCookie.get(COOKIE_NAME) || null;
  },
  set(token: string) {
    accessTokenCookie.set(COOKIE_NAME, token);
  },
  remove() {
    accessTokenCookie.remove(COOKIE_NAME);
  },
};
