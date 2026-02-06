import { useEffect, useState } from "react";
// import axios from "axios";
import CustomInput from "../../../inputFields/CustomInput";
// import { SERVER_DOMAIN, } from "../../../../Api/Api";
import { useDispatch, useSelector } from "react-redux";
// import CustomSelect5 from "../inputFields/CustomSelect5";
import { AppDispatch } from "../../../../store/store";
import { fetchBranches } from "../../../../slices/branchSlice";
import { toast } from "react-toastify";
// import { fetchMenuCategories } from "../../../../slices/menuSlice";
import { FaPlus } from "react-icons/fa6";
import LayoutComponent from "../../../Overview/Layout/LayoutComponent";
import { createCategory, updateCategory } from "../../../../slices/categorySlice";
// import MultiSelectDropdown from "./components/MultiSelectDropdown";
import AddSubCategoryModal from "../../AddMenuCategory/AddSubCategoryModal";
import { useNavigate, useParams } from "react-router-dom";
// import MultiSelectDropdown from "../components/MultiSelectDropdown";

interface SubCategoryItem {
  name: string;
  // description?: string;
  isActive: boolean;
}

const AddMenuCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const branches = useSelector((state: any) => state.branches.branches);
  const navigate = useNavigate();

  const [menuName, setMenuName] = useState<string>("");
  // const [description, setDescription] = useState<string>("");
  const { categories, loading, error } = useSelector((state: any) => state.category);
  const { id } = useParams<{ id: string }>();
  // const [selectedBranchIds, setSelectedBranchIds] = useState<string[]>([]);

  const [modVisibility, setModVisibility] = useState(false);
  // const [locationStatus, setLocationStatus] = useState(false);

  // 
  const [editCategory, setCategoryEdit] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);

  // Update sub-category state to generic object array
  const [subCategories, setSubCategories] = useState<SubCategoryItem[]>([]);
  const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);

  useEffect(() => {
    if (id && categories.length > 0) {
      const categoryToEdit = categories.find((cat: any) => cat.id === id);
      if (categoryToEdit) {
        setMenuName(categoryToEdit.name);
        setModVisibility(categoryToEdit.is_active);
        setSubCategories(
          categoryToEdit.subcategories.map((sub: any) => ({
            name: sub.name,
            isActive: sub.is_active,
          }))
        );
        setEditMode(true);
      }
    } else {
      setEditMode(false);
      setMenuName("");
      setModVisibility(false);
      setSubCategories([]);
    }
  }, [id, categories]);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleInputChange = (key: string, value: string) => {
    if (key === "menuName") {
      setMenuName(value);
      setCategoryEdit?.((prev: any) => ({
        ...prev,
        menu_category_name: value,
      }));
    }
  };

  const handleOpenSubCategoryModal = () => {
    setIsSubCategoryModalOpen(true);
  };

  const handleConfirmSubCategory = (newSub: SubCategoryItem) => {
    setSubCategories([...subCategories, newSub]);
  };

  const handleSubmit = async () => {
    if (!menuName) {
      toast.error("Please fill in the Category name");
      return;
    }

    const payload = {
      name: menuName,
      sort_order: 0, // Default sort order
      is_active: modVisibility,
      subcategories: subCategories.map((sub, index) => ({
        name: sub.name,
        sort_order: index,
        is_active: sub.isActive,
      })),
    };

    console.log("Payload to submit:", payload);

    try {
      if (editMode && id) {
        await dispatch(updateCategory({ id, payload })).unwrap();
      } else {
        await dispatch(createCategory(payload)).unwrap();
      }
      // Handle success if needed, though thunks toast success and refresh
      setMenuName("");
      setSubCategories([]);
      navigate("/menu-categories/");
    } catch (err: any) {
      console.error("Error occurred:", err);
      // Error is handled by the thunk (toast and state)
    }
  };

  return (
    <>
      <LayoutComponent
        title={editMode ? "Update Menu Category" : "New Menu Category"}
        description="Create a new menu categories to organize your menu."
        HeaderAction={
          <div className="flex gap-3">
            <button
              className="px-[24px] py-[10px] rounded border border-grey200 text-[#101010] font-[600] hover:bg-gray-50 bg-white"
              onClick={() => {
                // setIsModalOpen(false);
                setCategoryEdit({});
                setEditMode(false);
              }}
            >
              Cancel
            </button>
            <button
              className="px-[24px] py-[10px] rounded bg-[#0A0A0A] text-white font-[500] hover:bg-black/90 disabled:opacity-70"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? editMode
                  ? "Updating..."
                  : "Saving..."
                : editMode
                  ? "Update changes"
                  : "Save changes"}
            </button>
          </div>
        }
      >
        {/* <div className="h-[1px] w-full bg-grey100 mb-[32px]" /> */}

        <div className="space-y-[32px]">
          {/* Category Section */}
          <div className="grid grid-cols-12 gap-[24px]">
            <div className="col-span-3">
              <h3 className="text-[16px] font-[600] text-[#101010]">
                Category
              </h3>
            </div>
            <div className="col-span-9 space-y-[24px]">
              <div className="w-full max-w-[539px]">
                <p className="text-[14px] font-[500] text-[#344054] mb-[6px]">
                  Category name <span className="text-red-500">*</span>
                </p>
                <CustomInput
                  type="text"
                  label="Enter name"
                  value={menuName}
                  error=""
                  onChange={(newValue) =>
                    handleInputChange("menuName", newValue)
                  }
                  className="!py-[10px]"
                />
              </div>

            </div>
          </div>

          <div className="h-[1px] w-full bg-grey100" />

          {/* Sub-categories */}
          <div className="grid grid-cols-12 gap-[24px]">
            <div className="col-span-3">
              <h3 className="text-[16px] font-[600] text-[#101010]">
                Sub-categories
              </h3>
              <p className="text-[14px] text-grey300 mt-[4px]">
                Organise this category more
              </p>
            </div>
            <div className="col-span-9 space-y-[16px]">
              {subCategories.length > 0 &&
                subCategories.map((sub, index) => (
                  // Simple display valid for now, usually needs edit/delete controls
                  <div
                    key={index}
                    className="w-full max-w-[539px] p-3 border border-grey200 rounded flex justify-between items-center bg-gray-50"
                  >
                    <div>
                      <p className="font-[500] text-[14px] text-[#101010]">
                        {sub.name}
                      </p>

                    </div>
                    <div
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${sub.isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"}`}
                    >
                      {sub.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                ))}

              <button
                className="flex items-center gap-[8px] px-[16px] py-[10px] border border-grey200 rounded-[8px] text-[#344054] font-[600] text-[14px] hover:bg-gray-50"
                onClick={handleOpenSubCategoryModal}
              >
                <FaPlus className="text-grey400" />
                Add Sub-category
              </button>
            </div>
          </div>

          <div className="h-[1px] w-full bg-grey100" />

          {/* Visibility Toggle */}
          <div className="max-w-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Show as active
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  This category will be visible on the menu
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModVisibility(!modVisibility)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${modVisibility ? "bg-black" : "bg-gray-200"
                  }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${modVisibility ? "translate-x-5" : "translate-x-0"
                    }`}
                />
              </button>
            </div>
          </div>
          {/* location Toggle */}
        </div>

        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      </LayoutComponent>

      <AddSubCategoryModal
        isOpen={isSubCategoryModalOpen}
        onClose={() => setIsSubCategoryModalOpen(false)}
        onAdd={handleConfirmSubCategory}
        parentCategoryName={menuName || "New Category"}
      />
    </>
  );
};

export default AddMenuCategory;
