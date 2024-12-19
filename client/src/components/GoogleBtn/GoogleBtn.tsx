import { FcGoogle } from "react-icons/fc";
import { duration, btnStyle } from "../../utils/helpers.js";
import { useGoogleLogin } from "@react-oauth/google";

const GoogleBtn = () => {
  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log("Success:", credentialResponse);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const handleClick = () => {
    login();
  };

  return (
    <div
      className={`${btnStyle} ${duration} flex items-center justify-center cursor-pointer`}
      onClick={handleClick}
    >
      <FcGoogle style={{ height: "2em", width: "2em" }} />
    </div>
  );
};

export default GoogleBtn;
