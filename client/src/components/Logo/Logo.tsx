import logo from "/logo-get-pet.svg";

const Logo = ({ customLogoStyle }) => {
  return (
    <div className="flex flex-row items-center justify-center">
      <img src={logo} alt="" className={`${customLogoStyle || ""}`} />
    </div>
  );
};

export default Logo;
