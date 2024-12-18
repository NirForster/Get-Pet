import { FcGoogle } from "react-icons/fc";
import { duration, btnStyle } from "../../utils/helpers.js";

const GoogleBtn = () => {
  return (
    <div className={`${btnStyle} ${duration}`}>
      <FcGoogle />
    </div>
  );
};

export default GoogleBtn;
