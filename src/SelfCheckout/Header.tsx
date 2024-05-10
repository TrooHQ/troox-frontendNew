import Logo from "./assets/GreenLogo.svg";

const Header = () => {
  return (
    <div className="">
      <div className=" h-[448px] bg-[#0B7F7C] flex items-center justify-center">
        <img src={Logo} alt="" />
      </div>
    </div>
  );
};

export default Header;
