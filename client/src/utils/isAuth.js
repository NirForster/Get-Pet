import Cookies from "js-cookie";

export const isUserAllowed = () => {
  const cookie = Cookies.get("token");

  if (!cookie) {
    return false;
  } else {
    return true;
  }
};
