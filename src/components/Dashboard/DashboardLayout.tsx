import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="">
      <div className="flex ">
        <Sidebar userType="user" />

        <div
          className={` flex-grow m-3 w-[980px] 2xl:w-[1293px] h-full overflow-y-auto`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            className={`container mx-auto px-4 py-4 bg-white h-[100vh] overflow-y-scroll `}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              overflowX: "hidden",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
