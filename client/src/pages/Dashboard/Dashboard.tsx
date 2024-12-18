import axios from "axios";
import { useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { IoHeartCircleSharp } from "react-icons/io5";

const Dashboard = () => {
  const fetchPets = async () => {
    try {
      const res = await axios.get("");

      if (res) {
        console.log(res);
      }
    } catch (error) {
      console.error("error occurred durning fetching pets data: ", error);
    }
  };

  // useEffect(() => {
  //   fetchPets();
  // }, []);

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
          <IoMdCloseCircle className="text-[4em] text-chosenRed hover:text-black" />
        </button>
        <button>
          <IoHeartCircleSharp className="text-[4em] text-green-500 hover:text-black" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
