import { getCookie } from "./getCookie";

export function getRefreshToken() {
  return getCookie("refreshToken");
}
