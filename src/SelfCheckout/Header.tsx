import Logo from "./assets/chickenRepublic.png";

const Header = () => {
  return (
    <div className="">
      <div className=" h-[236px] bg-[#FF0000] flex items-center justify-center">
        <img src={Logo} alt="" />
      </div>
    </div>
  );
};

export default Header;
