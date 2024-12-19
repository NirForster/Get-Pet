import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/");
  }, 1500);

  return <div>Error404</div>;
};

export default Error404;
