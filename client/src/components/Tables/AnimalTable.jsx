import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs.tsx';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';

const dummyData = [
  {
    _id: '1',
    name: 'rex',
    status: 'is still waiting for you.',
    imgUrl: dogSvg,
  },
  {
    _id: '2',
    name: 'baba',
    status: 'is still waiting for you.',
    imgUrl: dogSvg,
  },
  {
    _id: '3',
    name: 'yuval',
    status: 'is still waiting for you.',
    imgUrl: dogSvg,
  },
];

import dogSvg from '/dog-svgrepo-com.svg';
export default function AnimalTable() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    // fetch data from backend
    setAnimals(dummyData);
  }, []);

  return (
    <TabsContent className="text-center" value="account">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>image</TableHead>
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
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TabsContent>
  );
}
