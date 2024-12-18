import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import GoogleBtn from "@/components/GoogleBtn/GoogleBtn";
import AppleBtn from "@/components/AppleBtn/AppleBtn";
import { duration, btnStyle } from "../../utils/helpers.js";

const Register = () => {
  return (
    <div className="w-full">
      <form className="flex flex-col items-center gap-[0.5em] w-full">
        <Input
          className="placeholder:text-gray-300"
          placeholder="Phone number"
          name="phone-number"
          id="phone-number"
          required
        ></Input>
        <Input
          placeholder="Name"
          name="name"
          id="name"
          className="placeholder:text-gray-300"
          required
        ></Input>
        <Input
          placeholder="Password"
          name="password"
          id="password"
          className="placeholder:text-gray-300"
          required
        ></Input>
        <div className="flex flex-row flex-wrap items-center gap-[0.2em]">
          <Checkbox name="terms" id="terms" />
          <label htmlFor="terms" className="text-[0.8em]">
            I agree to the
            <Link to="/get-pet/terms-and-use"> terms and conditions</Link>
          </label>
        </div>
        <Button type="submit" className={`${btnStyle} ${duration}`}>
          Create account
        </Button>
        <div className="flex items-center justify-between w-full">
          <hr className="flex-grow" />
          <p className="px-4 text-[0.8em] text-gray-400">Or Login with</p>
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

export default Register;
