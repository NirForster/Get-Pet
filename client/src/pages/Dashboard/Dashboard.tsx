import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { IoHeartCircleSharp } from "react-icons/io5";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [petId, setPetId] = useState("");

  const addPetToFavorite = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/users/:id/likePet`);

      if (res) {
      }
    } catch (error) {
      console.error(`error occurred while like pet: `, error);
    }
  };

  const fetchPets = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/pets/all?page=${page}&limit=1`
      );

      if (res) {
        setData(res.data.data[0]);
      }
    } catch (error) {
      console.error("Error occurred during fetching pets data:", error);
    }
  };

  const handleClick = (e) => {
    const btn = e.target.closest("button");

    if (btn.value === "next") {
      setPage((prev) => prev + 1);
      addPetToFavorite();
    } else if (btn.value === "declined") {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [page]);

  return (
    <div
      className="flex flex-col items-center justify-center gap-4"
      onClick={handleClick}
    >
      <div>
        <h1 className="font-titleFont text-[2em] text-center">
          <span className="text-chosenYellow">Swipe. </span>
          <span className="text-chosenRed">Love.</span>
          <span> Adopt.</span>
        </h1>
      </div>
      <div className="rounded-[1em] h-[350px] w-[250px] bg-gray-200 flex items-center justify-center">
        {data ?
          <img
            src={data.images[0]}
            alt={data.name}
            className="w-full h-full rounded-[1em] object-cover"
          />
        : <p>Loading...</p>}
      </div>
      <div className="text-center mt-2">
        {data && (
          <>
            <h2 className="font-bold text-lg">{data.name}</h2>
            <p className="text-gray-600">
              {data.age} years old - {data.breed}
            </p>
            <p className="text-gray-500">{data.description}</p>
            <p className="text-gray-400 italic">From: {data.adoptionCenter}</p>
          </>
        )}
      </div>
      <div className="flex flex-row flex-wrap w-full justify-center gap-[1em] mt-4">
        <button value="declined">
          <IoMdCloseCircle className="text-[4em] text-chosenRed hover:text-black" />
        </button>
        <button value="next">
          <IoHeartCircleSharp className="text-[4em] text-green-500 hover:text-black" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
