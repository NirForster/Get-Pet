import React from 'react';
import { useState } from 'react';
export default function AnimalTable() {
  const [animalName, setAnimalName] = useState('rex');

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
          <TableRow>
            <TableCell className="font-medium">{animalName}</TableCell>
            <TableCell>{animalName} is still waiting for you.</TableCell>
            <TableCell>
              <img src={dogSvg}></img>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TabsContent>
  );
}
