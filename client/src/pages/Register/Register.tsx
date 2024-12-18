import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Register = () => {
  return (
    <div className="w-full">
      <form className="flex flex-col items-center gap-[0.5em] w-full">
        <Input
          className="placeholder:text-gray-300"
          placeholder="Phone number"
          name="phone-number"
          id="phone-number"
        ></Input>
        <Input
          placeholder="Name"
          name="name"
          id="name"
          className="placeholder:text-gray-300"
        ></Input>
        <Input
          placeholder="Password"
          name="password"
          id="password"
          className="placeholder:text-gray-300"
        ></Input>
        <Input type="checkbox"></Input>
        <Button type="submit" className="w-full bg-chosenBlue">
          Create account
        </Button>
      </form>
    </div>
  );
};

export default Register;
