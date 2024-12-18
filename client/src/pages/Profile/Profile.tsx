import AnimalTable from "../../components/Tables/AnimalTable.jsx";
import { useEffect } from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar.tsx";
import { useDispatch } from "react-redux";
import { setProfilePicUser } from "@/store/slices/userSlice.ts";

export default function Profile() {
  const dispatch = useDispatch();
  // dispatch(setProfilePicUser(''));

  const fetchUserData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users/:id");
      if (res) {
        console.log(res);
      }
    } catch (error) {
      console.error(
        "error occurred durning getting user profile data: ",
        error
      );
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-[1em] absolute top-[5em] left-0 p-[1em] text-black">
      <div className="flex flex-row items-center w-full justify-center  rounded-[0.5em] p-[1em] h-[150px] gap-[0.5em]">
        <div>
          <Avatar>
            <AvatarImage
              src="/default-user-profile.svg"
              alt="profile Image user"
            />
          </Avatar>
        </div>
        <div className="flex flex-col">
          <div>Name</div>
          <div>Since: 10.10.2000</div>
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
