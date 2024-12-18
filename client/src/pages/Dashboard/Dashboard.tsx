import { IoMdCloseCircle } from "react-icons/io";
import { IoHeartCircleSharp } from "react-icons/io5";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h1 className="font-titleFont text-[2em] text-center">
          <span className="text-chosenYellow">Swipe. </span>
          <span className="text-chosenRed"> Love.</span>
          <span> Adopt.</span>
        </h1>
      </div>
      <div className="bg-gray-500 rounded-[1em] h-[350px] w-[250px]">
        <img src="" alt="" className="w-full" />
      </div>
      <div className="flex flex-row flex-wrap w-full justify-between">
        <button>
          <IoMdCloseCircle style={{ fontSize: "4em", color: "red" }} />
        </button>
        <button>
          <IoHeartCircleSharp style={{ fontSize: "4em", color: "green" }} />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
