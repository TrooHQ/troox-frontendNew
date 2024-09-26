import { useState } from "react";
import axios from "axios";

const PriceList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { menuItems, loading } = useSelector((state: any) => state.menu);
  const { selectedBranch } = useSelector((state: any) => state.branches);

  const [editMode, setEditMode] = useState<string | null>(null); // Track which item is being edited
  const [newPrice, setNewPrice] = useState<number | null>(null); // Store the new price input

  useEffect(() => {
    dispatch(fetchMenuItems({ branch_id: selectedBranch?.id }));
  }, [dispatch, selectedBranch]);

  // Handle the edit button click
  const handleEditClick = (item: any) => {
    setEditMode(item.id); // Set the current item in edit mode
    setNewPrice(item.menu_item_price); // Prepopulate the price with the current item's price
  };

  // Handle the price input change
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrice(parseFloat(e.target.value)); // Update the new price
  };

  // Handle saving the updated price
  const handleSave = async (item: any) => {
    if (newPrice === null) return;

    const payload = {
      menu_item_id: item.id,
      name: item.menu_item_name,
      price: newPrice,
      description: item.description || "",
      is_recommended: item.is_recommended,
      is_frozen: item.is_frozen,
    };

    try {
      await axios.put("https://troox-backend-new.vercel.app/api/menu/editMenuItem", payload);
      dispatch(fetchMenuItems({ branch_id: selectedBranch?.id })); // Refetch the updated menu items
      setEditMode(null); // Exit edit mode
    } catch (error) {
      console.error("Failed to update price", error);
    }
  };

  return (
    <div>
      <DashboardLayout>
        <TopMenuNav pathName="Price List" />
        <div className="mt-[40px]">
          <div className="flex items-center justify-between">
            <div className="border border-purple500 bg-purple500 w-[196px] rounded-[5px] px-[24px] py-[10px] font-[500] text-[#ffffff]">
              <button className="text-[16px] flex items-center gap-[8px]">
                <img src={Print} alt="" /> Print price list
              </button>
            </div>
            <div className="rounded-[5px] px-[24px] py-[10px] font-[500] text-purple500">
              <button className="text-[14px] flex items-center gap-[8px]">
                <img src={Publish} alt="" /> Publish changes
              </button>
            </div>
          </div>

          <div className="my-[40px]">
            <div className="flex items-center justify-between">
              <div className="relative">
                <input
                  type="text"
                  className="bg-[#F8F8F8] rounded p-2 pl-14 outline-none border border-[#5855B3]"
                  placeholder="Search"
                />
                <img
                  src={SearchIcon}
                  alt=""
                  className="absolute left-6 top-3 pointer-events-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto mt-6">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-[#606060] text-white text-center text-base font-normal">
                    <th className="py-2 px-4 text-base font-normal">Menu Group</th>
                    <th className="py-2 px-4 text-base font-normal text-start">Menu Name</th>
                    <th className="py-2 px-4 text-base font-normal">Price</th>
                    <th className="py-2 px-4 text-base font-normal">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="text-center">Loading...</td>
                    </tr>
                  ) : menuItems.length !== 0 ? (
                    menuItems.map((item: any, index: number) => (
                      <tr
                        key={item.id}
                        className={`${index % 2 === 1 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"}`}
                      >
                        <td className="text-base font-medium py-2 px-4">
                          {item.menu_group_name}
                        </td>
                        <td className="text-base font-medium py-2 px-4">
                          {item.menu_item_name}
                        </td>
                        <td className="text-base font-medium text-center py-2 px-4 break-words">
                          {editMode === item.id ? (
                            <input
                              type="number"
                              value={newPrice ?? ""}
                              onChange={handlePriceChange}
                              className="border border-gray-300 rounded p-1"
                            />
                          ) : (
                            `₦${parseFloat(item.menu_item_price).toLocaleString()}`
                          )}
                        </td>

                        <td className="flex items-center text-center">
                          {editMode === item.id ? (
                            <button
                              className="text-green-500"
                              onClick={() => handleSave(item)}
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              className="flex items-center gap-2"
                              onClick={() => handleEditClick(item)}
                            >
                              <img src={edit} alt="" />
                              Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center">No menu items found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default PriceList;
