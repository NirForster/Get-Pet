import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { duration, btnStyle } from "../../utils/helpers.js";
import GoogleBtn from "@/components/GoogleBtn/GoogleBtn";
import AppleBtn from "@/components/AppleBtn/AppleBtn";

const Login = () => {
  return (
    <div>
      <form className="flex flex-col items-center gap-[0.5em] w-full">
        <Input placeholder="Phone number" name="phone-number"></Input>
        <Input placeholder="Password" name="password"></Input>
        <Button type="submit" className={`${btnStyle} ${duration}`}>
          Login
        </Button>
        <div className="flex items-center justify-between w-full">
          <hr className="flex-grow" />
          <p className="px-4 text-[0.8em] text-gray-400">Or Register with</p>
          <hr className="flex-grow" />
        </div>
        <div className="flex w-full flex-row items-center gap-[0.5em]">
          <GoogleBtn />
          <AppleBtn />
        </div>
      </form>
    </div>
  );
};

export default Login;
