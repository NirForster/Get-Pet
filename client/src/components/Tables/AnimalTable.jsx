import { useEffect } from "react";
import { useState } from "react";
import { TabsContent } from "../../components/ui/tabs.tsx";
import dogSvg from "/dog-svgrepo-com.svg";
import {
  Table,
  TableBody,
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

export default function AnimalTable({ favoritePets = [] }) {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    if (favoritePets.length > 0) {
      setAnimals(favoritePets);
    }
  }, [favoritePets]);

  if (!favoritePets || favoritePets.length === 0) {
    return <div>No favorite pets found.</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Association</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {favoritePets.map((animal) => (
          <TableRow key={animal._id}>
            <TableCell className="font-medium">{animal.name}</TableCell>
            <TableCell>{animal.status || "No status available"}</TableCell>
            <TableCell>
              <img
                src={animal.images?.[0] || dogSvg}
                alt={animal.name}
                className="w-10 h-10"
              />
            </TableCell>
            <TableCell>{animal.association}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
