import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { duration, btnStyle } from "../../utils/helpers.js";
import GoogleBtn from "@/components/GoogleBtn/GoogleBtn";
import AppleBtn from "@/components/AppleBtn/AppleBtn";
import { Link } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState(false);

  const loginUser = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/users/login", data);
      if (res) {
        console.log("User logged in successfully:", res.data);
        setLogin(true);
      }
    } catch (error) {
      console.error(
        "Error during user login:",
        error.response || error.message
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const phoneNumber = formData.get("phoneNumber");
    const password = formData.get("password");

    if (!phoneNumber || !password) {
      alert("All fields are required.");
      return;
    }

    const data = { phoneNumber, password };
    loginUser(data);
  };

  return (
    <div>
      <form
        className="flex flex-col items-center gap-[0.5em] w-full"
        onSubmit={handleSubmit}
      >
        <Input placeholder="Phone number" name="phoneNumber" required />
        <Input
          placeholder="Password"
          name="password"
          type="password"
          required
        />
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

export default Login;
