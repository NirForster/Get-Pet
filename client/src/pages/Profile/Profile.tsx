import AnimalTable from "../../components/Tables/AnimalTable.jsx";
import { isUserAllowed } from "../../utils/isAuth.js";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs.tsx";
import { Avatar, AvatarImage } from "../../components/ui/avatar.tsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import formatDate from "../../utils/formatDate.js";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter.js";
import Loader from "@/components/Loader/Loader.tsx";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const canContinue = isUserAllowed();

  if (!canContinue) {
    navigate("/get-pet/register");
  }
  const {
    name = "User",
    profileImg = "",
    userId = "",
  } = useSelector((state: any) => state.user);
  const [userPersonalData, setUserPersonalData] = useState(null);
  const [favoritePets, setFavoritePets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  if (!name && profileImg && userId) {
    return;
  }

  const fetchPersonalData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/users/${userId}`);
      if (res?.data) {
        console.log(res);

        setUserPersonalData(res?.data);
        setFavoritePets(res?.data?.likedPets || []);
      }
    } catch (error) {
      console.error("Error fetching personal data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchPersonalData();
  }, [userId]);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center w-full gap-[1em] absolute top-[5em] left-0 p-[1em] text-black">
      <div className="flex flex-row items-center w-full justify-center bg-gray-200 rounded-[0.5em] p-[1em] h-[150px] gap-[0.5em]">
        <div>
          <Avatar>
            <AvatarImage src={profileImg} alt={`${name}'s profile`} />
          </Avatar>
        </div>
        <div className="flex flex-col">
          <div>{capitalizeFirstLetter(name)}</div>
          <div>Member Since: {formatDate(userPersonalData?.createdAt)}</div>
        </div>
      </div>
      <Tabs className="w-72 h-[300px]" defaultValue="pets">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pets">Pets</TabsTrigger>
          <TabsTrigger value="dog-sitters">Dog-sitters</TabsTrigger>
        </TabsList>

        <TabsContent value="pets">
          <AnimalTable favoritePets={favoritePets} />
        </TabsContent>
        <TabsContent value="dog-sitters">
          Change your password here.
        </TabsContent>
      </Tabs>
    </div>
  );
}
