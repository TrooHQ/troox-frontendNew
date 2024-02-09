import React, { useState } from "react";

interface TabItem {
  id: number;
  label: string;
  content: JSX.Element;
}

const OrderTab: React.FC = () => {
  const tabItems: TabItem[] = [
    { id: 1, label: "Taken", content: renderMenuCategory() },
    { id: 2, label: "Ready", content: renderMenuCategoryReady() },
  ];

  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
  };

  function renderMenuCategory() {
    return (
      <div className=" grid gap-[16px]">
        <div className=" rounded-[5px] px-[24px] py-[16px] bg-[#E7E7E7] border">
          <div className=" rounded-[5px] flex items-center justify-between font-[500] text-[18px]">
            <p>James O.</p>
            <p>#3,500</p>
          </div>
          <div className=" font-[400] text-[16px] mt-[8px]">
            <p>Jollof rice </p>
            <p>Titus</p>
            <p>Spaghetti</p>
          </div>

          <div className=" bg-[#ED5048] py-[8px] w-full rounded-[5px] mt-[16px] cursor-pointer">
            <p className=" text-white text-center font-[500] text-[14px]">
              {" "}
              Accept
            </p>
          </div>
        </div>
        <div className=" rounded-[5px] px-[24px] py-[16px] bg-[#E7E7E7] border">
          <div className=" rounded-[5px] flex items-center justify-between font-[500] text-[18px]">
            <p>James O.</p>
            <p>#3,500</p>
          </div>
          <div className=" font-[400] text-[16px] mt-[8px]">
            <p>Jollof rice </p>
            <p>Titus</p>
            <p>Spaghetti</p>
          </div>

          <div className=" bg-[#ED5048] py-[8px] w-full rounded-[5px] mt-[16px] cursor-pointer">
            <p className=" text-white text-center font-[500] text-[14px]">
              {" "}
              Accept
            </p>
          </div>
        </div>
      </div>
    );
  }

  function renderMenuCategoryReady() {
    return (
      <div className=" grid gap-[16px]">
        <div className=" rounded-[5px] px-[24px] py-[16px] bg-[#E7E7E7] border">
          <div className=" rounded-[5px] flex items-center justify-between font-[500] text-[18px]">
            <p>James O.</p>
            <p>#3,500</p>
          </div>
          <div className=" font-[400] text-[16px] mt-[8px]">
            <p>Jollof rice </p>
            <p>Titus</p>
            <p>Spaghetti</p>
          </div>

          <div className=" bg-[#11AE16] py-[8px] w-full rounded-[5px] mt-[16px] cursor-pointer">
            <p className=" text-white text-center font-[500] text-[14px]">
              {" "}
              Serve
            </p>
          </div>
        </div>
        <div className=" rounded-[5px] px-[24px] py-[16px] bg-[#E7E7E7] border">
          <div className=" rounded-[5px] flex items-center justify-between font-[500] text-[18px]">
            <p>James O.</p>
            <p>#3,500</p>
          </div>
          <div className=" font-[400] text-[16px] mt-[8px]">
            <p>Jollof rice </p>
            <p>Titus</p>
            <p>Spaghetti</p>
          </div>

          <div className=" bg-[#11AE16] py-[8px] w-full rounded-[5px] mt-[16px] cursor-pointer">
            <p className=" text-white text-center font-[500] text-[14px]">
              {" "}
              Serve
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2  mb-4 border-b">
        {tabItems.map((tab) => (
          <div
            key={tab.id}
            className={`cursor-pointer text-[16px] leading-[24px] py-4 px-4`}
            onClick={() => handleTabChange(tab.id)}
          >
            <p
              className={` inline text-[16px] leading-[24px] py-4 px-4 ${
                activeTab === tab.id
                  ? "font-[600] text-[#121212] border-b-4 border-[#E16B07] "
                  : "text-[#929292] font-[400]"
              }`}
            >
              {tab.label}
            </p>
          </div>
        ))}
      </div>
      <div>
        {tabItems.map((tab) => (
          <div
            key={tab.id}
            className={`${activeTab !== tab.id ? "hidden" : ""}`}
          >
            {tab.content}
          </div>
        ))}
      </div>

      {/* <Modal isOpen={editModal}>
        <div className="bg-white w-[300px]">
          <div
            className="cursor-pointer flex items-center justify-end"
            onClick={() => setEditModal(false)}
          >
            <img src={Close} alt="" />
          </div>
          <div className="">
            {editItem && (
              <>
                <p className=" text-[18px] font-[500] text-[#000000]">
                  {" "}
                  {editItem.title}
                </p>
                <div className=" my-[22px] flex items-center gap-[8px]">
                  <img src={MenuImg} alt="" />
                  <p className=" text-[14px] font-[400] text-[#5855B3]">
                    Click to replace image
                  </p>
                </div>
                <div className=" mb-[26px]">
                  <CustomInput
                    type="text"
                    label="Enter new price"
                    value={email}
                    onChange={(newValue) => setEmail(newValue)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </Modal> */}
    </div>
  );
};

export default OrderTab;
