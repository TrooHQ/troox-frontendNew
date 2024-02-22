import { useState } from "react";
import DashboardBackButton from "../../../buttons/DashboardBackButton";
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

  const toggleTableVisibility = (id: number) => {
    setVisibleTableId((prevId) => (prevId === id ? null : id));
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
              <div className=" flex items-center justify-between mt-[16px]">
                <p>{table.content}</p>
                <div className=" flex items-center gap-[10px]">
                  <img src={QrIcon} alt="" className=" h-[18px]" />
                  <img src={More} alt="" className=" cursor-pointer w-[5px]" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageQrCode;
