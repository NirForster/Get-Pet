import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { duration, btnStyle } from "../../utils/helpers.js";
import AppleBtn from "@/components/AppleBtn/AppleBtn";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  setGlobalCookie,
  setProfilePicUser,
  setRole,
  setUser,
  setUserId,
} from "../../store/slices/userSlice";
import GoogleBtn from "@/components/GoogleBtn/GoogleBtn.js";
import Loader from "@/components/Loader/Loader";

interface LoginData {
  phoneNumber: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loginUser = async (data: LoginData): Promise<void> => {
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/users/login", data);

      if (res) {
        const user = res.data.user;
        console.log(user);

        // Dispatch Redux actions directly with response data
        dispatch(setUser(user.name));
        dispatch(setProfilePicUser(user.profilePicture));
        dispatch(setRole(user.role));
        dispatch(setUserId(user._id));

        console.log("User logged in successfully:", res.data);

        // Set the token in cookies and Redux state
        Cookies.set("token", res.data.token, { expires: 7 });
        dispatch(setGlobalCookie(res.data.token));

        setTimeout(() => {
          navigate("/get-pet/dashboard");
          setIsLoading(false); // Stop loading after navigation
        }, 1000);
      }
    } catch (error: any) {
      console.error(
        "Error during user login:",
        error.response || error.message
      );
      setIsLoading(false); // Stop loading on error
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader /> {/* Show loader while processing */}
      </div>
    );
  }

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
          <Link to="/get-pet/login" className="hover:text-black">
            Login
          </Link>
        </Button>
        <div className="flex items-center justify-between w-full">
          <hr className="flex-grow" />
          <p className="px-4 text-[0.8em] text-gray-500 hover:text-black">
            <Link to="/get-pet/register">Or Register with</Link>
          </p>
          <hr className="flex-grow" />
        </div>
        <div className="flex w-full flex-row items-center gap-[0.5em]">
          <AppleBtn />
          <GoogleBtn />
        </div>
      </form>
    </div>
  );
};

export default Login;
