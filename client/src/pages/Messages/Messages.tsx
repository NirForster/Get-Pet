import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { isUserAllowed } from "../../utils/isAuth.js";

const Messages = () => {
  const navigate = useNavigate();
  const canContinue = isUserAllowed();

  if (!canContinue) {
    navigate("/get-pet/register");
  }
  return (
    <div className="p-6 max-w-lg mx-auto">
      {/* Main card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Main Card Title</h2>

        {/* First nested div */}
        <div className="bg-gray-100 rounded-md p-4 mb-3">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {/* <User className="w-10 h-10 text-gray-600" /> */}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">First Section</h3>
              <p className="text-gray-600 mt-2">
                This is the content for the first nested section. It's slightly
                smaller than the main card.
              </p>
            </div>
          </div>
        </div>

        {/* Second nested div */}
        <div className="bg-blue-50 rounded-md p-4 mb-3">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800">Second Section</h3>
              <p className="text-blue-600 mt-2">
                Here's another nested div with different styling to show
                contrast.
              </p>
            </div>
          </div>
        </div>

        {/* Third nested div */}
        <div className="bg-green-50 rounded-md p-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 className="font-semibold text-green-800">Third Section</h3>
              <p className="text-green-600 mt-2">
                And one final nested div to demonstrate the pattern.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
