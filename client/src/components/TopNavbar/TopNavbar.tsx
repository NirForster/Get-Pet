import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import Logo from "../Logo/Logo";

const iconStyle = "p-[0.5em]";

const TopNavbar = () => {
  const profileImg = useSelector((state) => state.user.profileImg);
  const userName = useSelector((state) => state.user.name);

  return (
    <div className="flex flex-row items-center justify-between absolute top-0 w-full left-0 p-[1em]">
      <Link to="/get-pet/profile">
        <div className="flex flex-row gap-[0.3em]">
          <img
            src={profileImg}
            alt="profile Image user"
            className="h-[1.5em]"
          />
          <p className="font-contextFont">Hello {userName}</p>
        </div>
      </Link>
      <Logo customLogoStyle="absolute h-[5em] top-[0.01em]" />
      <div className="flex flex-row gap-[0.3em]">
        <Link to="/get-pet/notifications" className={iconStyle}>
          <FaBell />
        </Link>
        <Link to="/get-pet/location" className={iconStyle}>
          <IoLocationSharp />
        </Link>
      </div>
    </div>
  );
};

export default TopNavbar;
