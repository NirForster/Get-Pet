import { Link } from "react-router-dom";
import logo from "/logo-get-pet.svg";

const Logo = ({ customLogoStyle }) => {
  return (
    <div>
      <Link to="/get-pet/dashboard">
        <div className="flex flex-row items-center justify-center">
          <img src={logo} alt="" className={`${customLogoStyle || ""}`} />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
