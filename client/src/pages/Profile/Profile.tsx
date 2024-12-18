import AnimalTable from "../../components/Tables/AnimalTable.jsx";

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
import { useState } from "react";

export default function Profile() {
  // const [animalName, setAnimalName] = useState('rex');
  // const [count, setCount] = useState('0');
  return (
    <div>
      <Avatar>
        <AvatarImage src="/avataryoav.svg" alt="" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Tabs className="w-72">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Animals</TabsTrigger>
          <TabsTrigger value="password">siters</TabsTrigger>
        </TabsList>

        <AnimalTable />

        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
