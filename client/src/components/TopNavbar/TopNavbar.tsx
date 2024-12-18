import { FaBell } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useSelector } from "react-redux";

const iconStyle = "p-[0.5em]";

const TopNavbar = () => {
  const setDefaultImg = useSelector((state) => state.user.profileImg);

  return (
    <div className="flex flex-row items-center justify-between absolute top-0 w-full left-0 p-[1em]">
      <div className="flex flex-row gap-[0.3em]">
        <img
          src="/default-user-profile.svg"
          alt="profile Image user"
          className="h-[1.5em]"
        />
        <p className="font-contextFont">Hi , Lay</p>
      </div>
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
