import { Close } from "@mui/icons-material";
import React, { useState } from "react";

const Modifiers = ({
  activeMainMenu,
  handleAddModifier,
  Add,
  handleConfirmSaveModal,
}: any) => {
  const [modifiers, setModifiers] = useState([{ id: 1, name: "", price: "" }]);

  const addModifier = () => {
    const newModifier = {
      id: modifiers.length + 1,
      name: "",
      price: "",
    };
    setModifiers([...modifiers, newModifier]);
  };

  const updateModifier = (id: number, field: string, value: string) => {
    const updatedModifiers = modifiers.map((modifier) => {
      if (modifier.id === id) {
        return { ...modifier, [field]: value };
      }
      return modifier;
    });
    setModifiers(updatedModifiers);
  };

  const removeModifier = (id: number) => {
    const filteredModifiers = modifiers.filter(
      (modifier) => modifier.id !== id
    );
    setModifiers(filteredModifiers);
  };

  return (
    <div className="">
      <div className=" mt-[32px] max-w-[628px]">
        <p className=" text-[20px] font-[500] text-purple500 mb-[8px]">
          Modifier {activeMainMenu?.toLowerCase()}
        </p>
        <hr className=" border-[#B6B6B6]" />
      </div>
      <div className=" grid gap-[56px]">
        <div>
          {modifiers.map((modifier, index) => (
            <div key={modifier.id} className="grid gap-[16px]">
              <div className=" mt-[32px]  flex items-center gap-[8px]">
                <input
                  type="text"
                  className=" border border-[#929292] rounded-[5px] placeholder:text-[#929292] py-[12px] w-[402px] px-[20px]"
                  placeholder=" Enter modifier name "
                  value={modifier.name}
                  onChange={(e) =>
                    updateModifier(modifier.id, "name", e.target.value)
                  }
                />
                <input
                  type="text"
                  className=" border border-[#929292] rounded-[5px] placeholder:text-[#929292] py-[12px] w-[127px] px-[20px]"
                  placeholder=" Enter price "
                  value={modifier.price}
                  onChange={(e) =>
                    updateModifier(modifier.id, "price", e.target.value)
                  }
                />
                <div className="flex items-center">
                  <button
                    className="px-[16px] py-[8px] font-[500]  rounded-[5px] text-purple500 text-[16px] flex items-center gap-[8px]"
                    onClick={handleAddModifier}
                  >
                    <img src={Add} alt="" /> Add - edit modifier item
                  </button>
                  {modifier.name && (
                    <Close onClick={() => removeModifier(modifier.id)} />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="mt-4 flex items-center gap-[8px]">
            <button
              className=" border border-[#5855B3] px-[16px] py-[8px] font-[500]  rounded-[5px] text-purple500 text-[14px] flex items-center gap-[8px]"
              onClick={addModifier}
            >
              Add
            </button>
            <button className=" border border-[#5855B3] px-[16px] py-[8px] font-[500]  rounded-[5px] text-purple500 text-[14px] flex items-center gap-[8px]">
              Edit
            </button>
          </div>
        </div>

        <div className="">
          <div className=" mt-[32px] max-w-[628px]">
            <p className=" text-[20px] font-[500] text-purple500 mb-[8px]">
              Modifier Rules
            </p>
            <hr className=" border-[#B6B6B6]" />
            <div className="">
              <div className="flex items-center gap-[16px] my-[16px]">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="h-6 w-6 border-[#87878780]"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-[16px] font-[400] text-[#000000]"
                >
                  Servers must make a selection for this group
                </label>
              </div>
              <div className="flex items-center gap-[16px] my-[16px]">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="h-6 w-6 border-[#87878780]"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-[16px] font-[400] text-[#000000]"
                >
                  This group is optional and is shown on add
                </label>
              </div>
              <div className="flex items-center gap-[16px] my-[16px]">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="h-6 w-6 border-[#87878780]"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-[16px] font-[400] text-[#000000]"
                >
                  This group is optional and is not shown on add
                </label>
              </div>
              <div className="flex items-center gap-[16px] my-[16px]">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="h-6 w-6 border-[#87878780]"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-[16px] font-[400] text-[#000000]"
                >
                  More than one modifier can be chosen
                </label>
              </div>
              <div className="flex items-center gap-[16px] my-[16px]">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="h-6 w-6 border-[#87878780]"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-[16px] font-[400] text-[#000000]"
                >
                  Only one modifier can be chosen{" "}
                </label>
              </div>
            </div>
            <hr className=" border-[#B6B6B6]" />
            <div className="flex items-center justify-end py-[16px]">
              <div
                className="cursor-pointer inline border border-purple500 bg-purple500 rounded px-[24px]  py-[10px] font-[500] text-[#ffffff]"
                onClick={handleConfirmSaveModal}
              >
                <button className=" text-[16px]">Save Modifier</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modifiers;
