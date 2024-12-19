import { FcGoogle } from "react-icons/fc";
import { duration, btnStyle } from "../../utils/helpers.js";

const GoogleBtn = ({ onClick }) => {
  return (
    <div className={`${btnStyle} ${duration}`}>
      <FcGoogle onClick={onClick} />
    </div>
  );
};

export default GoogleBtn;
