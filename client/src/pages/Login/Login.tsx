import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { duration, btnStyle } from "../../utils/helpers.js";
import GoogleBtn from "@/components/GoogleBtn/GoogleBtn";
import AppleBtn from "@/components/AppleBtn/AppleBtn";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface LoginData {
  phoneNumber: string;
  password: string;
}

const Login: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loginUser = async (data: LoginData): Promise<void> => {
    try {
      const res: AxiosResponse<{ token: string }> = await axios.post(
        "http://localhost:3000/users/login",
        data
      );
      if (res) {
        console.log("User logged in successfully:", res.data);
        setTimeout(() => {
          const cookie = Cookies.get("token");

          if (!cookie) {
            Cookies.set("token", res.data.token, { expires: 7 });
          }
        }, 2000);
        setLogin(true);
      }
    } catch (error: any) {
      console.error(
        "Error during user login:",
        error.response || error.message
      );
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const phoneNumber = formData.get("phoneNumber") as string;
    const password = formData.get("password") as string;

    if (!phoneNumber || !password) {
      alert("All fields are required.");
      return;
    }

    const data: LoginData = { phoneNumber, password };
    loginUser(data);
  };

  return (
    <div>
      <form
        className="flex flex-col items-center gap-[0.5em] w-full"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Phone number"
          name="phoneNumber"
          className="placeholder:text-[0.7em]"
          required
        />
        <div className="relative w-full">
          <Input
            className="placeholder:text-[0.7em]"
            placeholder="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ?
              <AiOutlineEyeInvisible size={20} />
            : <AiOutlineEye size={20} />}
          </button>
        </div>
        <Link
          to="/get-pet/forget-password"
          className="text-gray-400 text-[0.5em] w-full hover:text-black"
        >
          Forget password?
        </Link>
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
