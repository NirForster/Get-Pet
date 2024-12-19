import { useNavigate } from "react-router-dom";
import dogWatchTv from "/error-404.png";

const Error404 = () => {
  const navigate = useNavigate();

  // setTimeout(() => {
  //   navigate("/");
  // }, 3000);

  return (
    <div>
      <p className="text-black text-[3em]">Woof 404 woof!!!</p>
      <img src={dogWatchTv} alt="" />
    </div>
  );
};

export default Error404;
