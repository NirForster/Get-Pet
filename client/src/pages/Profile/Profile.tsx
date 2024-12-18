import React from "react";
import AnimalTable from "../../components/Tables/AnimalTable.jsx";
import { useState } from "react";
import dogSvg from "/dog-svgrepo-com.svg";
import { Button } from "../../components/ui/button.tsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table.tsx";
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
export default function Profile() {
  //   const [animalName, setAnimalName] = useState('rex');
  //   const [count, setCount] = useState('0');
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
        <animalName />
        <AnimalTable></AnimalTable>
        {/* <TabsContent className="text-center" value="account">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>image</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{animalName}</TableCell>
                <TableCell>{animalName} is still waiting for you.</TableCell>
                <TableCell>
                  <img src={dogSvg}></img>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent> */}
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
