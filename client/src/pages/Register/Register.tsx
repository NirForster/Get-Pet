import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import GoogleBtn from "@/components/GoogleBtn/GoogleBtn";
import AppleBtn from "@/components/AppleBtn/AppleBtn";
import axios from "axios";
import Cookies from "js-cookie";
import {
  duration,
  btnStyle,
  inputPlaceholderStyle,
} from "../../utils/helpers.js";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  setProfilePicUser,
  setRole,
  setUser,
  setUserId,
} from "@/store/slices/userSlice.js";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, setRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState();

  const registerUser = async (data: {
    name: string;
    phoneNumber: string;
    password: string;
  }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/users/register",
        data
      );

      if (res) {
        const user = res.data.user;
        console.log(user);
        // Dispatch Redux actions directly with response data
        dispatch(setUser(user.name));
        dispatch(setProfilePicUser(user.profilePicture));
        dispatch(setRole(user.role));
        dispatch(setUserId(user._id));

        console.log("User registered successfully:", res.data);

        // Set the token in cookies
        setTimeout(() => {
          Cookies.set("token", res.data.token, { expires: 7 });
        }, 1500);

        setRegister(true);
        navigate("/get-pet/question-user");
      }
    } catch (error: any) {
      console.error(
        "Error during user registration:",
        error.response || error.message
      );
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const password = formData.get("password") as string;
    const terms = formData.get("terms");

    if (!name || !phoneNumber || !password) {
      alert("All fields are required.");
      return;
    }

    if (!terms) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    const data = { name, phoneNumber, password };
    registerUser(data);
  };

  return (
    <div className="w-full">
      <div
        className={
          register ?
            "p-[0.5em] text-green-500 rounded-[0.5em] mb-[0.5em] text-center"
          : "hidden"
        }
      >
        <p>Successfully registered!</p>
      </div>
      <form
        className="flex flex-col items-center gap-[0.5em] w-full"
        onSubmit={handleSubmit}
      >
        <Input
          className={`${inputPlaceholderStyle}`}
          placeholder="Phone number"
          name="phoneNumber"
          id="phone-number"
          required
        />
        <Input
          placeholder="Name"
          name="name"
          id="name"
          className={`${inputPlaceholderStyle}`}
          required
        />
        <div className="relative w-full">
          <Input
            placeholder="Password"
            name="password"
            id="password"
            type={showPassword ? "text" : "password"}
            className={`${inputPlaceholderStyle}`}
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
        <div className="flex flex-row flex-wrap items-center gap-[0.2em]">
          <Checkbox name="terms" id="terms" required />
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
          <p className="px-4 text-[0.8em] text-gray-400 hover:text-black">
            <Link to="/get-pet/login" className="hover:text-black">
              Or Login with
            </Link>
          </p>
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
