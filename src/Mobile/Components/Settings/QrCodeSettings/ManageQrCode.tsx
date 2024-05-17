import { useEffect, useState } from "react";
import Arrow from "../../../assets/BackArrow.svg";
import arrowDown from "../../../assets/ArrowDown3.svg";
// import QrIcon from "../../../assets/qr_code_2.svg";
import More from "../../../assets/more_vert.svg";
import { useNavigate } from "react-router-dom";
import { SERVER_DOMAIN } from "../../../../Api/Api";
import axios from "axios";

// const data = [
//   {
//     id: 1,
//     name: "Poolside Table",
//     arrowImage: "ArrowDown3.svg",
//     content: "Table 1",
//   },
//   {
//     id: 2,
//     name: "Poolside2 Table",
//     arrowImage: "ArrowDown3.svg",
//     content: "Table 2",
//   },
//   {
//     id: 3,
//     name: "Poolside3 Table",
//     arrowImage: "ArrowDown3.svg",
//     content: "Table 3",
//   },
//   {
//     id: 4,
//     name: "Poolside4 Table",
//     arrowImage: "ArrowDown3.svg",
//     content: "Table 4",
//   },
// ];

interface Table {
  _id: number;
  group_name: string;
  qrcode: string;
  number: number;
}

const ManageQrCode = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [tablesGroup, setTablesGroup] = useState<Table[]>([]);
  const [visibleTableId, setVisibleTableId] = useState<number | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const toggleTableVisibility = (id: number) => {
    setVisibleTableId((prevId) => (prevId === id ? null : id));
  };

  const toggleMenuVisibility = (tableId: number) => {
    setOpenMenuId((prevId) => (prevId === tableId ? null : tableId));
  };

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const type = sessionStorage.getItem("type");

  const getTablesGroups = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/asset/getBusinessAsset/?type=${type}`,
        headers
      );
      console.log("Tables Retrieved successfully:", response.data);
      setTables(response.data);
    } catch (error) {
      console.error("Error adding employee:", error);
      // setLoading(false);
    }
  };

  const getTables = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/asset/getBusinessAssetGroup/?type=${type}`,
        headers
      );
      console.log("Tables Retrieved successfully:", response.data);
      setTablesGroup(response.data);
    } catch (error) {
      console.error("Error adding employee:", error);
      // setLoading(false);
    }
  };
  useEffect(() => {
    getTables();
    getTablesGroups();
  }, []);

  return (
    <div className="mt-[16px] mx-[20px]">
      <div
        onClick={() => navigate(-1)}
        className=" inline-flex items-center gap-[20px] cursor-pointer"
      >
        <img src={Arrow} alt="" />
        <p className=" font-[500] text-[20px] text-grey500 cursor-pointer">
          Manage QR Codes
        </p>
      </div>
      <div className="mt-[16px]">
        {tablesGroup.length === 0 ? (
          <p>
            No tables available for <span className=" capitalize">{type}</span>
          </p>
        ) : (
          tablesGroup.map((group, index) => (
            <div
              key={group._id}
              className="pt-[9px] pb-[16px] border-b border-b-[#E7E7E7]"
            >
              <div
                className="flex items-center justify-between"
                onClick={() => toggleTableVisibility(group._id)}
                style={{ cursor: "pointer" }}
              >
                <p className="text-[16px] font-[500]">
                  {group.group_name + (index + 1)}
                </p>
                <img
                  src={arrowDown}
                  alt=""
                  className={`transform ${
                    visibleTableId === group._id ? "rotate-180" : ""
                  }`}
                />
              </div>

              {visibleTableId === group._id &&
                tables
                  .filter((table) => table.group_name === group.group_name)
                  .map((table, index) => (
                    <div
                      className="flex items-center justify-between mt-[16px] relative"
                      key={index}
                    >
                      <div className=" flex items-center justify-between w-full">
                        <p>Table{table.number}</p>
                        <div className="flex items-center gap-[10px] ">
                          <img
                            src={table.qrcode}
                            alt=""
                            className="h-[100px]"
                          />
                          <img
                            src={More}
                            alt=""
                            className="cursor-pointer w-[5px]"
                            onClick={() => toggleMenuVisibility(table._id)}
                          />
                        </div>
                      </div>

                      {openMenuId === table._id && (
                        <div className="absolute right-[15px] top-10 bg-[#ffffff] p-[24px] shadow-lg w-[150px] z-50">
                          <div className="grid gap-[16px]">
                            <p className="text-[14px] font-[400]">Download</p>
                            <p className="text-[14px] font-[400]">Print</p>
                            <p className="text-[14px] font-[400]">Delete</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageQrCode;
