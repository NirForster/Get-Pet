import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { IoHeartCircleSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { isUserAllowed } from "../../utils/isAuth.js";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader/Loader.js";

// Define the types for your pet data
interface PetData {
  _id: string;
  name: string;
  age: number;
  breed: string;
  description: string;
  adoptionCenter: string;
  images: string[];
}

// Define the shape of the Redux state
interface RootState {
  user: {
    userId: string;
  };
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const canContinue = isUserAllowed();

  if (!canContinue) {
    navigate("/get-pet/register");
  }

  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<PetData | null>(null);
  const [petId, setPetId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = useSelector((state: RootState) => state.user.userId);

  const addPetToFavorite = async () => {
    if (!petId || !userId) {
      console.log(`petId is ${petId}`);
      console.log(`userId is ${userId}`);
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:3000/users/${userId}/likePet`,
        { petId }
      );

      if (res) {
        console.log(res.data);
      }
    } catch (error) {
      console.error(`Error occurred while liking pet: `, error);
    }
  };

  const fetchPets = async () => {
    try {
      setLoading(true); // Show loader
      const res = await axios.get<{
        data: PetData[];
      }>(`http://localhost:3000/pets/all?page=${page}&limit=1`);

      if (res) {
        const pet = res.data?.data[0];
        setData(pet);
        setPetId(pet?._id || null);
      }
    } catch (error) {
      console.error("Error occurred during fetching pets data:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const btn = (e.target as HTMLButtonElement).closest("button");

    if (btn?.value === "next") {
      setPage((prev) => prev + 1);
      addPetToFavorite();
    } else if (btn?.value === "declined") {
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
      {loading ?
        <Loader />
      : <>
          <div>
            <h1 className="font-titleFont text-[2em] text-center">
              <span className="text-chosenYellow">Swipe. </span>
              <span className="text-chosenRed">Love.</span>
              <span> Adopt.</span>
            </h1>
          </div>
          <div className="rounded-[1em] h-[350px] w-[250px] bg-gray-200 flex items-center justify-center">
            {data && (
              <img
                src={data.images[0]}
                alt={data.name}
                className="w-full h-full rounded-[1em] object-cover"
              />
            )}
          </div>
          <div className="text-center mt-2">
            {data && (
              <>
                <h2 className="font-bold text-lg">{data.name}</h2>
                <p className="text-gray-600">
                  {data.age} years old - {data.breed}
                </p>
                <p className="text-gray-500">{data.description}</p>
                <p className="text-gray-400 italic">
                  From: {data.adoptionCenter}
                </p>
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
        </>
      }
    </div>
  );
};

export default Dashboard;
