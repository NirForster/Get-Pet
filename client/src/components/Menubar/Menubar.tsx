import { FaDog } from "react-icons/fa";
import { PiChatsCircle } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { pointer } from "../../utils/helpers.js";
import { Link } from "react-router-dom";

const Menubar = () => {
  return (
    <div className="flex flex-row items-center justify-around w-full text-white bg-black absolute bottom-[0] left-0 py-[0.2em]">
      <Link to="/get-pet/dashboard">
        <div
          className={`${pointer} p-[1em] hover:bg-chosenBlue rounded-[0.5em]`}
        >
          <FaDog style={{ fontSize: "2em" }} />
        </div>
      </Link>
      <Link to="/get-pet/search">
        <div
          className={`${pointer} p-[1em] hover:bg-chosenBlue rounded-[0.5em]`}
        >
          <IoSearchOutline style={{ fontSize: "2em" }} />
        </div>
      </Link>
      <Link to="/get-pet/messages">
        <div
          className={`${pointer} p-[1em] hover:bg-chosenBlue rounded-[0.5em]`}
        >
          <PiChatsCircle style={{ fontSize: "2em" }} />
        </div>
      </Link>
      <Link to="/get-pet/settings">
        <div
          className={`${pointer} p-[1em] hover:bg-chosenBlue rounded-[0.5em]`}
        >
          <IoSettingsOutline style={{ fontSize: "2em" }} />
        </div>
      </Link>
    </div>
  );
};

export default Menubar;
