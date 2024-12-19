import { useNavigate } from "react-router-dom";
import dogWatchTv from "/error-404.png";
import fourOfourText from "/404-text.svg";

const Error404 = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/");
  }, 4000);

  return (
    <div>
      <img src={fourOfourText} alt="" className="w-full" />
      <img src={dogWatchTv} alt="" />
    </div>
  );
};

export default Error404;
