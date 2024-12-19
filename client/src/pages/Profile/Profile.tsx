import AnimalTable from "../../components/Tables/AnimalTable.jsx";
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

export default function Profile() {
  const { name, profileImg, userId } = useSelector((state: any) => state.user);
  const [userPersonalData, setUserPersonalData] = useState(null);

  const fetchPersonalData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/users/${userId}`);

      if (res) {
        console.log(res);
        setUserPersonalData(res.data);
      }
    } catch (error) {
      console.error("error occurred durning fetching personal data: ", error);
    }
  };

  useEffect(() => {
    fetchPersonalData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-[1em] absolute top-[5em] left-0 p-[1em] text-black">
      <div className="flex flex-row items-center w-full justify-center bg-gray-200 rounded-[0.5em] p-[1em] h-[150px] gap-[0.5em]">
        <div>
          <Avatar>
            <AvatarImage src={profileImg} alt={`${name}'s profile`} />
          </Avatar>
        </div>
        <div className="flex flex-col">
          <div>{capitalizeFirstLetter(name) || "User"}</div>
          <div>Member since: {formatDate(userPersonalData?.createdAt)}</div>
        </div>
      </div>
      <Tabs className="w-72 h-[300px]" defaultValue="pets">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pets">Pets</TabsTrigger>
          <TabsTrigger value="dog-sitters">Dog-sitters</TabsTrigger>
        </TabsList>

        <TabsContent value="pets">
          <AnimalTable />
        </TabsContent>
        <TabsContent value="dog-sitters">
          Change your password here.
        </TabsContent>
      </Tabs>
    </div>
  );
}
