import { useState } from "react";
import DashboardBackButton from "../../../Buttons/DashboardBackButton";
import Arrow from "../../../assets/BackArrow.svg";
import arrowDown from "../../../assets/ArrowDown3.svg";
import QrIcon from "../../../assets/qr_code_2.svg";
import More from "../../../assets/more_vert.svg";

const data = [
  {
    id: 1,
    name: "Poolside Table",
    arrowImage: "ArrowDown3.svg",
    content: "Table 1",
  },
  {
    id: 2,
    name: "Poolside2 Table",
    arrowImage: "ArrowDown3.svg",
    content: "Table 2",
  },
  {
    id: 3,
    name: "Poolside3 Table",
    arrowImage: "ArrowDown3.svg",
    content: "Table 3",
  },
  {
    id: 4,
    name: "Poolside4 Table",
    arrowImage: "ArrowDown3.svg",
    content: "Table 4",
  },
];

const ManageQrCode = () => {
  const [visibleTableId, setVisibleTableId] = useState<number | null>(null);
  const [menu, setMenu] = useState(false);

  const toggleTableVisibility = (id: number) => {
    setVisibleTableId((prevId) => (prevId === id ? null : id));
    setMenu(false);
  };

  const HandleModal = () => {
    setMenu((prevState) => !prevState);
  };

  return (
    <div className="mt-[16px] mx-[20px]">
      <DashboardBackButton text="Manage QR Codes" img={Arrow} />
      <div className="mt-[16px]">
        {data.map((table) => (
          <div
            key={table.id}
            className="pt-[9px] pb-[16px] border-b border-b-[#E7E7E7]"
          >
            <div
              className="flex items-center justify-between "
              onClick={() => toggleTableVisibility(table.id)}
              style={{ cursor: "pointer" }}
            >
              <p className=" text-[16px] font-[500]">{table.name}</p>
              <img
                src={arrowDown}
                alt=""
                className={`transform ${
                  visibleTableId === table.id ? "rotate-180" : ""
                }`}
              />
            </div>

            {visibleTableId === table.id && (
              <div className=" flex items-center justify-between mt-[16px] relative">
                <p>{table.content}</p>
                <div className=" flex items-center gap-[10px]">
                  <img src={QrIcon} alt="" className=" h-[18px]" />
                  <img
                    src={More}
                    alt=""
                    className=" cursor-pointer w-[5px]"
                    onClick={HandleModal}
                  />
                </div>

                {/* <div className=" absolute right-0 top-10 bg-[#ffffff] p-[24px] shadow-lg">
                  {menu && (
                    <div className=" grid gap-[16px]">
                      <p className="">Download</p>
                      <p>Print</p>
                      <p>Delete</p>
                    </div>
                  )}
                </div> */}

                {menu && (
                  <div className=" absolute right-0 top-10 bg-[#ffffff] p-[24px] shadow-lg w-[150px] z-50">
                    <div className=" grid gap-[16px]">
                      <p className=" text-[14px] font-[400]">Download</p>
                      <p className=" text-[14px] font-[400]">Print</p>
                      <p className=" text-[14px] font-[400]">Delete</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageQrCode;
