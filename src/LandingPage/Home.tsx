import Navbar from "./Navbar";
import Circle from "../assets/greyCircle.svg";
const Home = () => {
  return (
    <div className=" relative">
      <div className=" max-w-[1440px] mx-[10px] md:mx-[40px] 2xl:mx-auto ">
        <img
          src={Circle}
          alt=""
          className=" hidden  md:absolute top-0 left-0"
        />
        <Navbar />
      </div>
    </div>
  );
};

export default Home;
