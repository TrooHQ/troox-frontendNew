import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import Add from "../../assets/add.svg";
import CancelButton from "../buttons/CancelButton";
import CustomInput from "../inputFields/CustomInput";
import Modal from "../Modal";
import { useState } from "react";
import { setUserData } from "../../slices/InviteUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { Link } from "react-router-dom";
import QrCode from "../../assets/qr-code.png";
import More from "../../assets/more_vert.svg";
import ArrowToggle from "../../assets/chevron-down2.svg";

const DropdownMenu = ({ onClose }) => {
  const handleItemClick = (action) => {
    console.log("Clicked:", action);
    onClose();
  };

  return (
    <ul className="dropdown-menu absolute bg-white p-[24px]  left-10 top-[50px] z-10">
      <li
        onClick={() => handleItemClick("Edit")}
        className="font-[400] pb-[24px]"
      >
        Edit
      </li>
      <li onClick={() => handleItemClick("Download")} className="font-[400]">
        Print Label
      </li>
    </ul>
  );
};
const ManageTables: React.FC = () => {
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [expandedOwner, setExpandedOwner] = useState("");

  const toggleMenu = (index) => {
    setActiveMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const toggleOwner = (owner) => {
    setExpandedOwner((prevOwner) => (prevOwner === owner ? "" : owner));
  };

  interface Table {
    tableNo: string;
    id: string;
    qrCode: string;
  }

  interface TablesData {
    tables: {
      [owner: string]: Table[];
    };
  }

  const data: TablesData = {
    tables: {
      Akate: [
        {
          tableNo: "01",
          id: "T001",
          qrCode: "qr-code-url-1",
        },
        {
          tableNo: "02",
          id: "T002",
          qrCode: "qr-code-url-2",
        },
        {
          tableNo: "03",
          id: "T003",
          qrCode: "qr-code-url-2",
        },
      ],
      Jake: [
        {
          tableNo: "01",
          id: "T001",
          qrCode: "qr-code-url-1",
        },
        {
          tableNo: "02",
          id: "T002",
          qrCode: "qr-code-url-2",
        },
        {
          tableNo: "03",
          id: "T003",
          qrCode: "qr-code-url-2",
        },
      ],
    },
  };

  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.inviteUser);

  const [addModifierModar, setAddModifierModal] = useState(false);
  const handleAddModifier = () => {
    setAddModifierModal(true);
  };
  const handleInputChange = (fieldName: string, value: string) => {
    dispatch(setUserData({ [fieldName]: value }));
  };
  return (
    <div className="">
      <DashboardLayout>
        <TopMenuNav pathName="Manage Tables" />
        <div className=" mt-[40px]">
          <div
            className="border inline-block border-purple500 bg-purple500  rounded-[5px] px-[24px] py-[10px] font-[500] text-[#ffffff]"
            onClick={handleAddModifier}
          >
            <button className="text-[16px] flex items-center gap-[8px]">
              <img src={Add} alt="" /> New Table Arrangement
            </button>
          </div>

          {Object.keys(data.tables).length === 0 && (
            <div className="my-auto flex items-center justify-center">
              <p className="text-grey200 text-[20px] font-[400]">
                No table information has been set yet
              </p>
            </div>
          )}

          {Object.entries(data.tables).map(([owner, tables]) => (
            <div key={owner}>
              <div
                className=" cursor-pointer flex items-center justify-between border-b py-[16px] border-[#E7E7E7]"
                onClick={() => toggleOwner(owner)}
              >
                <h2 className="  text-[#5855B3]  text-[20px] font-[400] ">
                  {owner}
                </h2>
                <div className="">
                  <img
                    src={ArrowToggle}
                    alt=""
                    className={`transform transition-transform duration-300 ${
                      expandedOwner === owner ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              {expandedOwner === owner && (
                <>
                  <div className="mt-[32px] grid grid-cols-6 items-center border-b px-5 border-b-grey100 text-grey300 text-[16px] font-[400]">
                    <p className="col-span-2 px-3 py-2">Table No</p>
                    <p className="col-span-2 px-3 py-2">Table ID</p>
                    <p className="px-3 py-2">QR Code</p>
                    <p className="px-3 py-2 text-end">Actions</p>
                  </div>
                  <div>
                    <ul className="">
                      {tables.map((table, index) => (
                        <li
                          key={index}
                          className={`grid grid-cols-6 items-center px-5 py-[16px] text-grey300 text-[16px] font-[400] ${
                            index % 2 === 0 ? "bg-[#F8F8F8]" : ""
                          }`}
                        >
                          <p className="col-span-2 px-3 py-2 ">
                            {" "}
                            {table.tableNo}
                          </p>
                          <p className="col-span-2 px-3 py-2 "> {table.id}</p>
                          <p className="px-3 py-2">
                            <img src={QrCode} alt="" />
                          </p>
                          <div className="flex items-center justify-center gap-[16px] relative px-3 py-2">
                            <img
                              src={More}
                              alt=""
                              onClick={() => toggleMenu(index)}
                              className="cursor-pointer"
                            />
                            {activeMenuIndex === index && (
                              <DropdownMenu onClose={() => toggleMenu(index)} />
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <Modal
          isOpen={addModifierModar}
          onClose={() => setAddModifierModal(false)}
        >
          <div className=" w-[539px] py-[32px] px-[52px]">
            <div className="">
              <p className=" text-[24px] mb-[11px] font-[500] text-purple500">
                Table Arrangement
              </p>
              <hr className="border my-[24px] border-[#E7E7E7]" />
              <div className=" flex items-center gap-[8px] justify-center">
                <div className=" flex-grow  ">
                  <CustomInput
                    type="text"
                    label="How many tables do you have?"
                    value={userData.department}
                    error=""
                    onChange={(newValue) =>
                      handleInputChange("department", newValue)
                    }
                  />
                </div>
              </div>
              <hr className="border mb-[16px] mt-[24px] border-[#E7E7E7]" />

              <div className=" flex justify-end items-center  gap-2">
                <div
                  className="border cursor-pointer border-purple500 rounded px-[24px]  py-[10px] font-[600] text-purple500"
                  onClick={() => setAddModifierModal(false)}
                >
                  <CancelButton text="Cancel" />
                </div>

                <Link to="/table-list">
                  <div className="border border-purple500 bg-purple500 rounded px-[24px]  py-[10px] font-[500] text-[#ffffff]">
                    <button className=" text-[16px]">Enter</button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </Modal>
      </DashboardLayout>
    </div>
  );
};

export default ManageTables;
