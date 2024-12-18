import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import GoogleBtn from "@/components/GoogleBtn/GoogleBtn";
import AppleBtn from "@/components/AppleBtn/AppleBtn";
import axios from "axios";
import {
  duration,
  btnStyle,
  inputPlaceholderStyle,
} from "../../utils/helpers.js";
import { useState } from "react";

const Register = () => {
  const [register, setRegister] = useState(false);

  const registerUser = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/users/register",
        data
      );
      if (res) {
        console.log("User registered successfully:", res.data);
        setRegister(true);
      }
    } catch (error) {
      console.error(
        "Error during user registration:",
        error.response || error.message
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const phoneNumber = formData.get("phoneNumber"); // Changed key to match consistency
    const password = formData.get("password");
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
        <p>Successfully register!</p>
      </div>
      <form
        className="flex flex-col items-center gap-[0.5em] w-full"
        onSubmit={handleSubmit}
      >
        <Input
          className={`${inputPlaceholderStyle}`}
          placeholder="Phone number"
          name="phoneNumber" // Updated name to match data key
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
        <Input
          placeholder="Password"
          name="password"
          id="password"
          type="password"
          className={`${inputPlaceholderStyle}`}
          required
        />
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
