import Menubar from "@/components/Menubar/Menubar";
import TopNavbar from "@/components/TopNavbar/TopNavbar";
import { IoMdCloseCircle } from "react-icons/io";
import { IoHeartCircleSharp } from "react-icons/io5";

const Dashboard = () => {
  return (
    <div>
      <TopNavbar />
      <div className="bg-gray-500 rounded-[1em] h-[350px] w-[250px]">
        <img src="" alt="" />
      </div>
      <div className="flex flex-row flex-wrap w-full justify-between">
        <button>
          <IoMdCloseCircle style={{ fontSize: "4em", color: "red" }} />
        </button>
        <button>
          <IoHeartCircleSharp style={{ fontSize: "4em", color: "green" }} />
        </button>
      </div>
      <Menubar />
    </div>
  );
};

export default Dashboard;
