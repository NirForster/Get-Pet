import AnimalTable from "../../components/Tables/AnimalTable.jsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs.tsx";
import { Avatar, AvatarImage } from "../../components/ui/avatar.tsx";
import { useSelector } from "react-redux";

export default function Profile() {
  const { name, profileImg } = useSelector((state: any) => state.user);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-[1em] absolute top-[5em] left-0 p-[1em] text-black">
      <div className="flex flex-row items-center w-full justify-center bg-gray-200 rounded-[0.5em] p-[1em] h-[150px] gap-[0.5em]">
        <div>
          <Avatar>
            <AvatarImage src={profileImg} alt={`${name}'s profile`} />
          </Avatar>
        </div>
        <div className="flex flex-col">
          <div>{name || "User"}</div>
          <div>Since: 10.10.2000</div> {/* Placeholder for join date */}
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
