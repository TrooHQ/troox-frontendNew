import Modal from "../../Modal";

const ModifierModal = ({
  addModifierModar,
  setAddModifierModal,
  handleConfirmSave,
  modifiers,
  setModifiers,
  editModifierData,
  setEditModifierData,
  loading,
  handleUpdateMod,
}: any) => {
  const updateModifier = (id: number, field: string, value: string) => {
    setModifiers(
      modifiers.map((modifier: any) =>
        modifier.id === id ? { ...modifier, [field]: value } : modifier
      )
    );
  };

  const editModifier = (key: any, value: any) => {
    setEditModifierData((prevModifier: any) => ({
      ...prevModifier,
      [key]: value,
    }));
  };

  console.log('modifiers', modifiers)
  console.log('editModifierData', editModifierData)

  return (
    <Modal isOpen={addModifierModar} onClose={() => setAddModifierModal(false)}>
      <div className=" w-[539px] py-[32px] px-[52px]">
        <div className="">
          <p className=" text-[24px] mb-[11px] font-[500] text-black">Add modifier</p>
          <hr className="border my-[24px] border-[#E7E7E7]" />

          {/* Render input fields for each modifier */}
          {modifiers.map(
            (
              modifier: {
                id: any;
                price: any;
                name: any;

              },
              index: number
            ) => (
              <div key={index} className="flex items-center gap-[8px] justify-center mb-[8px]">
                {/* <img src={AddWhite} alt="" onClick={handleAddModifier} className="cursor-pointer" /> */}
                {editModifierData ?
                  <div className="flex items-center gap-[8px]">
                    <input
                      type="text"
                      className="border border-[#929292] rounded-[5px] placeholder:text-[#929292] py-[12px] px-[8px] w-[300px]"
                      placeholder=" Enter modifier name "
                      value={editModifierData.modifier_name}
                      onChange={(e) => editModifier("modifier_name", e.target.value)}
                    />
                    <input
                      type="text"
                      className="border border-[#929292] rounded-[5px] placeholder:text-[#929292] py-[12px] px-[8px] w-[100px]"
                      placeholder=" Enter price "
                      value={editModifierData.modifier_price}
                      onChange={(e) => editModifier("modifier_price", e.target.value)}
                    />
                  </div> :
                  <div className="flex items-center gap-[8px]">
                    <input
                      type="text"
                      className="border border-[#929292] rounded-[5px] placeholder:text-[#929292] py-[12px] px-[8px] w-[300px]"
                      placeholder=" Enter modifier name "
                      value={modifier.name}
                      onChange={(e) => updateModifier(modifier.id as any, "name", e.target.value)}
                    />
                    <input
                      type="text"
                      className="border border-[#929292] rounded-[5px] placeholder:text-[#929292] py-[12px] px-[8px] w-[100px]"
                      placeholder=" Enter price "
                      value={modifier.price}
                      onChange={(e) => updateModifier(modifier.id, "price", e.target.value)}
                    />
                  </div>
                }
              </div>
            )
          )}

          <hr className="border mb-[16px] mt-[24px] border-[#E7E7E7]" />

          <div className="flex items-center justify-end gap-2">
            <div
              className="border cursor-pointer borderblack rounded px-[24px] py-[10px] font-[600] text-black"
              onClick={() => { setEditModifierData(null); setAddModifierModal(false); setModifiers([]) }}
            >
              <p className="font-[500] text-[16px] text-black cursor-pointer">Cancel</p>
            </div>

            <div
              className="border borderblack bg-black rounded px-[24px] py-[10px] font-[500] text-[#ffffff]"
              onClick={() => { editModifierData ? handleUpdateMod() : handleConfirmSave(modifiers) }}
            >
              {editModifierData ? <button className=" text-[16px]">Update item</button> : <button className=" text-[16px]">{loading ? "Saving..." : "Save item"}</button>}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModifierModal;
