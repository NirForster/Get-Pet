import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { isUserAllowed } from "../../utils/isAuth.js";

const Search = () => {
  const navigate = useNavigate();
  const canContinue = isUserAllowed();

  if (!canContinue) {
    navigate("/get-pet/register");
  }

  return (
    <div className="relative w-full max-w-md">
      <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
      <Input placeholder="Search for dog-sitter" className="pl-10" />
    </div>
  );
};

export default Search;
