import { useDispatch } from "react-redux";
import { apiUrl } from "../consts";
import { getRefreshToken } from "../utils/getRefreshToken";
import { login, logout } from "../redux/authSlice";

export const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refreshToken = async () => {
    try {
      const response = await fetch(`${apiUrl}auth/token/refresh`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh_token: getRefreshToken(),
        }),
      });

      const result = await response.json();

      if (result.token) {
        const token = result.token;
        const refreshToken = result.refresh_token;
        document.cookie = `token=${token}`;
        document.cookie = `refreshToken=${refreshToken}`;
        dispatch(login());
      } else {
        dispatch(logout());
      }
    } catch (error) {
      dispatch(logout());
    }
  };

  return refreshToken;
};
