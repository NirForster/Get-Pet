import { Button } from "@/components/ui/button";
import dogImage from "/dog-image-landing-page.svg";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import GoogleBtn from "@/components/GoogleBtn/GoogleBtn";
import AppleBtn from "@/components/AppleBtn/AppleBtn";
import { duration } from "../../utils/helpers.js";

const Landing = () => {
  return (
    <div className="flex flex-col items-center w-full justify-center font-contextFont text-center gap-[0.5em]">
      <div className="relative">
        <img src={dogImage} alt="Dog on landing page" />
        <div>
          <h1 className="font-titleFont text-[2em]">
            <span className="text-chosenYellow">Swipe. </span>
            <span className="text-chosenRed"> Love.</span>
            <span> Adopt.</span>
          </h1>
          <p className="text-[1.2em] mb-[0.5em]">
            Find a friend, Love without end.
          </p>
        </div>
        <div className="flex flex-row items-center w-full justify-center gap-[0.2em] p-[1em]">
          <div className="relative flex flex-row">
            <Link to="/get-pet/register">
              <Button
                className={`w-[10em] flex justify-center items-center hover:bg-chosenYellow h-[3.9em] ${duration}`}
              >
                Get Started
              </Button>
            </Link>
            <FiArrowUpRight className="absolute top-[0.1em] right-[0em] text-white" />
          </div>
          <GoogleBtn />
          <AppleBtn />
        </div>
        <div className="w-full flex-row flex justify-center mt-[0.5em] text-[0.8em] gap-[0.5em]">
          <p>Already have an Account? </p>
          <div>
            <Link
              to="/get-pet/login"
              className={`text-chosenRed hover:text-black transition ${duration}`}
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
