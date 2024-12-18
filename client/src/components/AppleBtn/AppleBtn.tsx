import { IoLogoApple } from "react-icons/io5";

const AppleBtn = () => {
  return (
    <div className="bg-gray-300 p-[0.6em] rounded-[0.5em] hover:bg-black cursor-pointer w-full text-center flex flex-row items-center justify-center">
      <IoLogoApple style={{ color: "white" }} />
    </div>
  );
};

export default AppleBtn;
