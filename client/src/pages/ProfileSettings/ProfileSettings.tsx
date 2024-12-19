import { useNavigate } from "react-router-dom";
import { isUserAllowed } from "../../utils/isAuth.js";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const canContinue = isUserAllowed();

  if (!canContinue) {
    navigate("/get-pet/register");
  }
  return <div>ProfileSettings</div>;
};

export default ProfileSettings;
