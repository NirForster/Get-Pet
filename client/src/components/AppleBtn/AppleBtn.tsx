import { IoLogoApple } from "react-icons/io5";
import { duration, btnStyle } from "../../utils/helpers.js";

const AppleBtn = () => {
  return (
    <div className={`${btnStyle} ${duration}`}>
      <IoLogoApple style={{ color: "white", height: "2em", width: "2em" }} />
    </div>
  );
};

export default AppleBtn;
