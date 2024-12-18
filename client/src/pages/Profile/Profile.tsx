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
