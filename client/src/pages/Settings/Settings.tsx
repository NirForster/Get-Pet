import { useNavigate } from "react-router-dom";
import { isUserAllowed } from "../../utils/isAuth.js";

const Settings = () => {
  const navigate = useNavigate();
  const canContinue = isUserAllowed();

  if (!canContinue) {
    navigate("/get-pet/register");
  }

  return <div>Settings</div>;
};

export default Settings;
