import React, { useEffect } from "react";
import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs.tsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const dummyData = [
  {
    _id: "1",
    name: "rex",
    status: "Waiting for adoption.",
    imgUrl: dogSvg,
    association: "pt",
  },
  {
    _id: "2",
    name: "baba",
    status: "Waiting for adoption.",
    imgUrl: dogSvg,
    association: "ta",
  },
  {
    _id: "3",
    name: "yuvalllll",
    status: "Waiting for adoption.",
    imgUrl: dogSvg,
    association: "je",
  },
];

import dogSvg from "/dog-svgrepo-com.svg";
export default function AnimalTable() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    // fetch data from backend
    setAnimals(dummyData);
  }, []);

  return (
    <TabsContent className="text-center text-black" value="pets">
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead className="w-[100px]">name</TableHead> */}
            <TableHead className="">name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>image</TableHead>
            <TableHead>association</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {animals.map((animal) => {
            return (
              <TableRow key={animal._id}>
                <TableCell className="font-medium">{animal.name}</TableCell>
                <TableCell>
                  {animal.name} {animal.status}
                </TableCell>
                <TableCell>
                  <img src={animal.imgUrl}></img>
                </TableCell>
                <TableCell>{animal.association}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TabsContent>
  );
}
