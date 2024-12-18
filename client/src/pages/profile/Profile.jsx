import React from 'react';
import { Button } from '../../components/ui/button.tsx';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs.tsx';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
export default function Profile() {
  return (
    <div>
      {/* Profile
      <Tabs className="">kjjkkj</Tabs>
      <Button>yoav</Button> */}
      <Avatar>
        <AvatarImage
          src="https://unsplash.com/photos/man-in-black-beanie-cap-kVg2DQTAK7c"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Tabs className="">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Animals</TabsTrigger>
          <TabsTrigger value="password">siters</TabsTrigger>
        </TabsList>
        <TabsContent className="text-center" value="account">
          ddd
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
