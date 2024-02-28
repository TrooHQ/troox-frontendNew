import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import QrCode from "../../assets/qr-code.png";
import More from "../../assets/more_vert.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import CustomInput from "../inputFields/CustomInput";
import Modal from "../Modal";
import { setUserData } from "../../slices/InviteUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import CancelButton from "../../Mobile/Buttons/CancelButton";

const DropdownMenu = ({ onClose }: { onClose: () => void }) => {
  const handleItemClick = (action: string) => {
    console.log("Clicked:", action);
    onClose();
  };

  return (
    <ul className="dropdown-menu absolute bg-white p-[24px] left-10 top-[50px] z-10">
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

const TableList = () => {
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);

  const toggleMenu = (index: number | null) => {
    // @ts-ignore
    setActiveMenuIndex((prevIndex: number | null) =>
      prevIndex === null || prevIndex !== index ? index : null
    );
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
    <div>
      <DashboardLayout>
        <TopMenuNav pathName="Manage Tables" />
        <div className="mt-[40px]">
          {Object.values(data.tables).map((tables, ownerIndex) => (
            <div key={ownerIndex}>
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
                      <p className="col-span-2 px-3 py-2 "> {table.tableNo}</p>
                      <p className="col-span-2 px-3 py-2 "> {table.id}</p>
                      <p className="px-3 py-2">
                        <img src={QrCode} alt="" />
                      </p>
                      <div className="flex items-center justify-center gap-[16px] relative px-3 py-2">
                        <img
                          src={More}
                          alt=""
                          onClick={() => toggleMenu(index)}
                          className="cursor-pointer w-[5px]"
                        />
                        {activeMenuIndex === index && (
                          <DropdownMenu onClose={() => toggleMenu(index)} />
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <div className=" flex items-center justify-end my-[28px]">
            <div
              className="border border-purple500 bg-purple500 rounded px-[24px]  py-[10px] font-[500] text-[#ffffff] inline"
              onClick={handleAddModifier}
            >
              <button className=" text-[16px]">Save As</button>
            </div>
          </div>
        </div>

        <Modal
          isOpen={addModifierModar}
          onClose={() => setAddModifierModal(false)}
        >
          <div className=" w-[539px] py-[32px] px-[52px]">
            <div className="">
              <p className=" text-[24px] mb-[11px] font-[500] text-purple500">
                Save Table As
              </p>
              <hr className="border my-[24px] border-[#E7E7E7]" />
              <div className=" flex items-center gap-[8px] justify-center">
                <div className=" flex-grow  ">
                  <CustomInput
                    type="text"
                    label="Enter table Name"
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

                <Link to="/manage-tables">
                  <div className="border border-purple500 bg-purple500 rounded px-[24px]  py-[10px] font-[500] text-[#ffffff]">
                    <button className=" text-[16px]">Save</button>
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

export default TableList;
