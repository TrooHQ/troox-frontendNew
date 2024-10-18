import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import Add from "../../assets/add.svg";
import CheckCircle from "../../assets/check_circle.svg";
import Close from "../../assets/closeIcon.svg";
import PublishIcon from "../../assets/publishIcon.svg";
import Publish from "../../assets/publish.svg";
import activeArrow from "../../assets/activeArrow.svg";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import Modifiers from "./components/Modifiers";
import AddMenuCategory from "./AddMenuCategory";
import { AppDispatch } from "@/src/store/store";
import {
  fetchMenuCategories,
  fetchMenuGroups,
  fetchMenuItemsByMenuGroup,
} from "../../slices/menuSlice";
import { truncateText } from "../../utils/truncateText";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { toast } from "react-toastify";
import { convertToBase64 } from "../../utils/imageToBase64";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { CancelOutlined, EditOutlined, MoreVert } from "@mui/icons-material";
import VisibilityOpen from "./VisibilityOpen";
import EditOpen from "./EditOpen";
import ConfirmationDialog from "./ConfirmationDialog";
import SuccessModal from "./MenuBuilderModals/SuccessModal";
import ConfirmSaveModal from "./MenuBuilderModals/ConfirmSaveModal";
import AddMenuGroup from "./MenuBuilderModals/AddMenuGroup";
import MenuGroup from "./MenuBuilderModals/MenuGroup";
import AddMenuItem from "./MenuBuilderModals/AddMenuItem";
import CustomInput from "../inputFields/CustomInput";

const MenuBuilder = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { categories, menuGroups, menuItemsByGroup, mgLoading } = useSelector(
    (state: any) => state.menu
  );
  const { selectedBranch } = useSelector((state: any) => state.branches);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMenuGroup, setAddMenuGroup] = useState(false);
  const [addMenuItem, setAddMenuItem] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [publishModal, setPublishModal] = useState(false);
  const [confirmPublishModal, setConfirmPublishModal] = useState(false);
  const [confirmSaveModal, setConfirmSaveModal] = useState(false);
  const [addModifierModar, setAddModifierModal] = useState(false);
  const [menuGroupLoading, setMenuGroupLoading] = useState(false); // Loading state for menu groups
  const [menuItemLoading, setMenuItemLoading] = useState(false); // Loading state for menu items

  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [menuName, setMenuName] = useState("");
  const [menuDescription, setMenuDescription] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [applyPriceToAll, setApplyPriceToAll] = useState(false);
  const [price, setPrice] = useState("");
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [editCategoryModalOpen, setEditCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{ id: string; oldName: string } | null>(
    null
  );
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [newGroupName, setNewGroupName] = useState<string>("");
  const [editingGroup, setEditingGroup] = useState<{ id: string; oldName: string } | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  const handleCategoryEdit = (category: any) => {
    console.log("Edit category:", category);
    setEditingCategory({ id: category._id, oldName: category.name });
    setNewCategoryName(category.name); // Set initial value to the current name
    setEditCategoryModalOpen(true);
    setAnchorEl2(null);
  };

  const handleEditCategoryConfirm = async () => {
    if (editingCategory) {
      setEditLoading(true);
      try {
        const response = await axios.put(
          `${SERVER_DOMAIN}/menu/editMenu`,
          {
            branch_id: selectedBranch?.id,
            menu_type: "category",
            old_name: editingCategory.oldName,
            name: newCategoryName,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Category updated successfully");
          // Optionally refresh the list of categories
          dispatch(fetchMenuCategories(selectedBranch.id));
        }
      } catch (error) {
        console.error("Error editing category:", error);
        toast.error("Failed to edit category.");
      } finally {
        setEditCategoryModalOpen(false);
        setEditingCategory(null);
        setNewCategoryName("");
        setEditLoading(false);
      }
    }
  };

  const handleMenuItemClick = (itemName: string) => {
    setSelectedMenuItem(itemName);
  };

  const handleAddModifier = () => {
    setAddModifierModal(true);
  };

  const handleGroupName = (value: string) => {
    setGroupName(value);
  };
  const handleMenuName = (value: string) => {
    setMenuName(value);
  };
  const handleMenuDescription = (value: any) => {
    console.log(value);
    setMenuDescription(value);
  };
  const handleMenuPrice = (value: string) => {
    setMenuPrice(value);
  };
  const handlePrice = (value: string) => {
    setPrice(value);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApplyPriceToAll(event.target.value === "yes");
  };

  const [imageName, setImageName] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    setImageName(file.name);
    try {
      const base64 = await convertToBase64(file);
      setImage(base64 as string);
    } catch (error) {
      console.error("Error converting file to base64:", error);
    }
  };

  const handleAddMenu = () => {
    setIsModalOpen(true);
  };

  const handleAddMenuGroup = () => {
    setAddMenuGroup(true);
  };
  const handleAddMenuItem = () => {
    setAddMenuItem(true);
  };

  const handleSuccessModal = () => {
    setConfirmSaveModal(false);
    setSuccessModal(true);
  };

  const handlePublishModal = () => {
    setConfirmPublishModal(false);
    setPublishModal(true);
  };
  const handleConfirmPublishModal = () => {
    setConfirmPublishModal(true);
  };

  const [subMenuContent, setSubmenuContent] = useState<
    {
      type: string;
      data: {
        img: string;
        price: string;
        name: string;
      }[];
    }[]
  >([]);
  const [activeMainMenu, setActiveMainMenu] = useState<string | null>(categories[0]?.name || null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  const getSubmenu = (categoryName: string) => {
    const category = categories.find((cat: any) => cat.name === categoryName);

    if (category) {
      setActiveMainMenu(category.name);
      setSubmenuContent([{ type: category.name, data: [] }]);
    }
  };

  console.log(activeMainMenu, activeSubMenu);

  useEffect(() => {
    if (selectedBranch && activeSubMenu) {
      setMenuItemLoading(true); // Set loading to true before fetching menu items
      setSelectedMenuItem(null); // Clear the selected menu item when a new group is selected
      dispatch(
        fetchMenuItemsByMenuGroup({
          branch_id: selectedBranch.id,
          menu_group_name: activeSubMenu,
        })
      ).finally(() => {
        setMenuItemLoading(false); // Set loading to false after fetching
      });
    }
  }, [selectedBranch, activeSubMenu]);

  // Fetch data based on selectedBranch, activeMainMenu, and activeSubMenu
  useEffect(() => {
    if (selectedBranch) {
      dispatch(fetchMenuCategories(selectedBranch.id));
    }
  }, [selectedBranch]);

  useEffect(() => {
    if (selectedBranch && activeMainMenu) {
      dispatch(
        fetchMenuGroups({
          branch_id: selectedBranch.id,
          menu_category_name: activeMainMenu,
        })
      );
    }
  }, [selectedBranch, activeMainMenu]);

  const handleFetchMenuItems = () => {
    console.log(selectedBranch, activeSubMenu);
    if (selectedBranch && activeSubMenu) {
      dispatch(
        fetchMenuItemsByMenuGroup({
          branch_id: selectedBranch.id,
          menu_group_name: activeSubMenu,
        })
      );
    }
  };

  // Update submenuContent when menuItems change
  useEffect(() => {
    if (menuItemsByGroup?.length > 0) {
      setSubmenuContent([
        {
          type: activeSubMenu as any,
          data: menuItemsByGroup.map((item: any) => ({
            img: item.menu_item_image,
            price: item.menu_item_price.toString(),
            name: item.menu_item_name,
          })),
        },
      ]);
    } else {
      setSubmenuContent([{ type: activeSubMenu as any, data: [] }]);
    }
  }, [menuItemsByGroup, activeSubMenu]);

  const handleSaveMenuGroup = async () => {
    setMenuGroupLoading(true);

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    let payload = {
      category_name: activeMainMenu,
      group_name: groupName,
      branch_id: selectedBranch.id,
      price_to_all_items: applyPriceToAll,
      ...(applyPriceToAll && { price: Number(price) }),
    };

    try {
      const response = await axios.post(`${SERVER_DOMAIN}/menu/addMenuGroup`, payload, headers);
      console.log(response);
      dispatch(
        fetchMenuGroups({
          branch_id: selectedBranch.id,
          menu_category_name: activeMainMenu,
        })
      );
      toast.success(response.data.message || "Menu group added successfully.");

      setGroupName("");
      setApplyPriceToAll(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || "An error occurred. Please try again.");
    } finally {
      setMenuGroupLoading(false);
      setAddMenuGroup(false);
    }
  };

  const handleSaveMenuItem = async () => {
    setMenuGroupLoading(true);

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      const response = await axios.post(
        `${SERVER_DOMAIN}/menu/addMenuItem`,
        {
          menu_category_name: activeMainMenu,
          branch_id: selectedBranch.id,
          menu_group_name: activeSubMenu,
          menu_item_name: menuName,
          description: menuDescription,
          price: Number(menuPrice),
          image,
        },
        headers
      );
      console.log(response);
      dispatch(
        fetchMenuItemsByMenuGroup({
          branch_id: selectedBranch.id,
          menu_group_name: activeSubMenu,
        })
      );
      toast.success(response.data.message || "Menu group added successfully.");
      setMenuName("");
      setMenuDescription("");
      setMenuPrice("");
      setImage("");
      setAddMenuItem(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || "An error occurred. Please try again.");
    } finally {
      setMenuGroupLoading(false);
      setAddMenuGroup(false);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, groupName: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedGroup(groupName);
  };

  const handleClick2 = (event: React.MouseEvent<HTMLElement>, categoryName: string) => {
    setAnchorEl2(event.currentTarget);
    setSelectedCategory(categoryName);
  };

  console.log("Category name:", selectedCategory);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  // Implement actions for visibility, edit, and remove
  const handleMenuVisibility = () => {
    handleClose();
    setIsVisibilityOpen(true);
  };

  const handleEdit = (group: any) => {
    console.log("Edit group:", selectedGroup, group);
    handleClose();
    setEditingGroup({ id: group._id, oldName: group.name });
    setNewGroupName(group.name);
    setIsEditOpen(true);
  };

  const handleEditGroupConfirm = async () => {
    if (editingGroup) {
      setEditLoading(true);
      try {
        const response = await axios.put(
          `${SERVER_DOMAIN}/menu/editMenu`,
          {
            branch_id: selectedBranch?.id,
            menu_type: "group",
            old_name: editingGroup.oldName,
            name: newGroupName,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Group updated successfully");
          // Optionally refresh the list of groups
          dispatch(
            fetchMenuGroups({
              branch_id: selectedBranch?.id,
              menu_category_name: activeMainMenu,
            })
          );
        }
      } catch (error) {
        console.error("Error editing group:", error);
        toast.error("Failed to edit group.");
      } finally {
        setIsEditOpen(false);
        setEditingGroup(null);
        setNewGroupName("");
        setEditLoading(false);
      }
    }
  };

  const [confirmationDialog, setConfirmationDialog] = useState({
    open: false,
    item: {},
  });

  const handleDeleteClick = (item: any) => {
    console.log("Remove group:", item);
    setConfirmationDialog({ open: true, item: item });
    handleClose();
  };

  const handleCategoryDeleteClick = (item: any) => {
    console.log("Remove category:", item);
    setConfirmationDialog({ open: true, item: item });
    handleClose2();
  };

  const handleConfirmDelete = async () => {
    if (confirmationDialog.item) {
      await handleDeleteMenuName(confirmationDialog.item);
      setConfirmationDialog({ open: false, item: "" });
    }
  };

  const handleDeleteMenuName = async (item: any) => {
    try {
      const authToken = localStorage.getItem("token");

      const response = await axios.delete(`${SERVER_DOMAIN}/menu/removeMenu/`, {
        params: {
          menu_type: "group",
          name: item.name,
          branch_id: item.branch,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        // Optionally refresh the list of modifiers after deletion
        toast.success("Item deleted successfully");
        dispatch(
          fetchMenuGroups({
            branch_id: selectedBranch.id,
            menu_category_name: activeMainMenu,
          })
        );
        // dispatch(fetchMenuItemsByMenuGroup({ branch_id: viewingBranch?._id as any }));
      } else {
        alert("Failed to delete modifier");
      }
    } catch (error) {
      console.error("Error deleting modifier:", error);
      alert("An error occurred while deleting the modifier");
    }
  };

  return (
    <div>
      <DashboardLayout>
        <TopMenuNav pathName="Menu" />
        <div className="">
          <div className="mt-[40px]">
            <div className="flex items-center justify-between">
              <div className="border border-purple500 bg-purple500 w-fit rounded-[5px] px-[24px] py-[10px] font-[500] text-[#ffffff]">
                <button className="text-[16px] flex items-center gap-[8px]" onClick={handleAddMenu}>
                  <img src={Add} alt="" /> Add new menu category
                </button>
              </div>
              <div
                className="rounded-[5px] px-[24px] py-[10px] font-[500] text-purple500"
                onClick={handleConfirmPublishModal}
              >
                <button className="text-[14px] flex items-center gap-[8px]">
                  <img src={Publish} alt="" /> Publish changes
                </button>
              </div>
            </div>

            <div className=" flex ">
              <div className="mt-[24px]">
                <nav className="flex flex-col gap-[8px]">
                  {categories.map((category: any) => (
                    <div
                      onClick={() => getSubmenu(category.name)}
                      key={category._id}
                      className={`${
                        activeMainMenu === category.name && "bg-purple100 text-purple600 font-[500]"
                      } text-grey200 hover:bg-purple100 uppercase flex justify-between items-center w-[201px] text-[16px] font-[400] py-[12px] px-[8px]`}
                    >
                      {truncateText(category.name, 13)}
                      {activeMainMenu === category.name && (
                        <IconButton
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          onClick={(event) => handleClick2(event, category)}
                        >
                          <MoreVert />
                        </IconButton>
                      )}
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl2}
                        keepMounted
                        open={Boolean(anchorEl2)}
                        onClose={handleClose2}
                      >
                        <MenuItem
                          onClick={() => handleCategoryEdit(selectedCategory)}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <EditOutlined
                            sx={{
                              fontSize: "20px",
                              fontWeight: "300",
                            }}
                          />
                          <span style={{ fontWeight: "300" }}>Edit</span>
                        </MenuItem>
                        {/* <MenuItem
                          onClick={() => handleCategoryDeleteClick(category)}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <CancelOutlined
                            sx={{
                              fontSize: "20px",
                              fontWeight: "300",
                            }}
                          />
                          <span style={{ fontWeight: "300" }}>Remove</span>
                        </MenuItem> */}
                      </Menu>
                      {activeMainMenu === category.name ? (
                        <img src={activeArrow} alt="activearrow" />
                      ) : null}
                    </div>
                  ))}
                </nav>
              </div>
              <div className=" flex-grow">
                <MenuGroup
                  mgLoading={mgLoading}
                  menuGroups={menuGroups}
                  activeSubMenu={activeSubMenu}
                  setActiveSubMenu={setActiveSubMenu}
                  handleFetchMenuItems={handleFetchMenuItems}
                  anchorEl={anchorEl}
                  handleClick={handleClick}
                  handleClose={handleClose}
                  handleMenuVisibility={handleMenuVisibility}
                  handleEdit={handleEdit}
                  handleDeleteClick={handleDeleteClick}
                  handleAddMenuGroup={handleAddMenuGroup}
                  menuItemLoading={menuItemLoading}
                  subMenuContent={subMenuContent}
                  selectedMenuItem={selectedMenuItem}
                  handleMenuItemClick={handleMenuItemClick}
                  handleAddMenuItem={handleAddMenuItem}
                  truncateText={truncateText}
                />
                <Modifiers
                  activeMainMenu={activeMainMenu}
                  activeSubMenu={activeSubMenu}
                  selectedBranch={selectedBranch}
                  selectedMenuItem={selectedMenuItem}
                  addModifierModar={addModifierModar}
                  setAddModifierModal={setAddModifierModal}
                  handleAddModifier={handleAddModifier}
                />
              </div>
            </div>
          </div>

          {/* Modals */}
          <ConfirmationDialog
            open={confirmationDialog.open}
            onClose={() => setConfirmationDialog({ open: false, item: {} })}
            onConfirm={handleConfirmDelete}
            message={`Are you sure you want to delete this item?`}
          />

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <AddMenuCategory setIsModalOpen={setIsModalOpen} />
          </Modal>

          <Modal isOpen={isVisibilityOpen} onClose={() => setIsVisibilityOpen(false)}>
            <VisibilityOpen setIsVisibilityOpen={setIsVisibilityOpen} />
          </Modal>

          <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
            {/* <EditOpen setIsEditOpen={setIsEditOpen} /> */}
            <div className=" w-[539px] py-[32px] px-[52px]">
              <h2 className="text-[24px] mb-[11px] font-[500] text-purple500">Edit Group Name</h2>
              <CustomInput
                type="text"
                label=""
                value={newGroupName}
                error=""
                onChange={(newValue) => setNewGroupName(newValue)}
              />
              <hr className="border my-[24px] border-[#E7E7E7]" />
              <div className="flex items-center justify-end gap-4 mt-8">
                <button
                  onClick={handleEditGroupConfirm}
                  className="bg-[#5855B3] text-white rounded-[6px] px-4 py-2"
                >
                  {editLoading ? "Loading..." : "Confirm"}
                </button>
                <button
                  onClick={() => setIsEditOpen(false)}
                  className="bg-[#F8F8F8] text-[#5855B3] rounded-[6px] px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>

          {/* {editCategoryModalOpen && ( */}
          <Modal isOpen={editCategoryModalOpen} onClose={() => setEditCategoryModalOpen(false)}>
            <div className=" w-[539px] py-[32px] px-[52px]">
              <h2 className="text-[24px] mb-[11px] font-[500] text-purple500">
                Edit Category Name
              </h2>
              <CustomInput
                type="text"
                label=""
                value={newCategoryName}
                error=""
                onChange={(newValue) => setNewCategoryName(newValue)}
              />
              <hr className="border my-[24px] border-[#E7E7E7]" />
              <div className="flex items-center justify-end gap-4 mt-8">
                <button
                  onClick={handleEditCategoryConfirm}
                  className="bg-[#5855B3] text-white rounded-[6px] px-4 py-2"
                >
                  {editLoading ? "Loading..." : "Confirm"}
                </button>
                <button
                  onClick={() => setEditCategoryModalOpen(false)}
                  className="bg-[#F8F8F8] text-[#5855B3] rounded-[6px] px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
          {/* )} */}

          <Modal isOpen={successModal} onClose={() => setSuccessModal(false)}>
            <SuccessModal setSuccessModal={setSuccessModal} />
          </Modal>

          <Modal isOpen={confirmSaveModal} onClose={() => setConfirmSaveModal(false)}>
            <ConfirmSaveModal
              handleSuccessModal={handleSuccessModal}
              setSuccessModal={setSuccessModal}
            />
          </Modal>

          <Modal isOpen={publishModal} onClose={() => setPublishModal(false)}>
            <div className=" w-[443px] px-[32px] py-[32px]">
              <div
                className="flex items-center justify-end cursor-pointer"
                onClick={() => setPublishModal(false)}
              >
                <img src={Close} alt="" className=" " />
              </div>
              <div className=" flex flex-col gap-[24px] items-center justify-center">
                <img src={CheckCircle} alt="" />
                <p className="text-grey500 text-[22px] font-[500]">Changes Published!</p>
                <p className="text-[16px] font-[400] text-grey500">
                  Changes have been published successfully
                </p>
              </div>
            </div>
          </Modal>

          <Modal isOpen={confirmPublishModal} onClose={() => setConfirmPublishModal(false)}>
            <div className=" w-[443px] px-[32px] py-[32px]">
              <div
                className="flex items-center justify-end cursor-pointer"
                onClick={() => setConfirmPublishModal(false)}
              >
                <img src={Close} alt="" className=" " />
              </div>
              <div className=" flex flex-col gap-[24px] items-center justify-center">
                <img src={PublishIcon} alt="" />
                <p className="text-grey500 text-[22px] font-[500]">Publish changes</p>
                <p className="text-[16px] font-[400] text-grey500">
                  Do you want to publish changes made to this menu?
                </p>
                <div
                  className="border border-purple500 bg-purple500 rounded px-[24px]  py-[10px] font-[500] text-[#ffffff]"
                  onClick={handlePublishModal}
                >
                  <button className=" text-[16px]">Yes</button>
                </div>
              </div>
            </div>
          </Modal>

          <Modal isOpen={addMenuGroup} onClose={() => setAddMenuGroup(false)}>
            <AddMenuGroup
              setAddMenuGroup={setAddMenuGroup}
              groupName={groupName}
              handleGroupName={handleGroupName}
              applyPriceToAll={applyPriceToAll}
              handleOptionChange={handleOptionChange}
              price={price}
              handlePrice={handlePrice}
              handleSaveMenuGroup={handleSaveMenuGroup}
              menuGroupLoading={menuGroupLoading}
            />
          </Modal>

          <Modal isOpen={addMenuItem} onClose={() => setAddMenuItem(false)}>
            <AddMenuItem
              setAddMenuItem={setAddMenuItem}
              menuName={menuName}
              handleMenuName={handleMenuName}
              menuDescription={menuDescription}
              handleMenuDescription={handleMenuDescription}
              menuPrice={menuPrice}
              handleMenuPrice={handleMenuPrice}
              handleFileChange={handleFileChange}
              image={image}
              imageName={imageName}
              handleSaveMenuItem={handleSaveMenuItem}
              menuGroupLoading={menuGroupLoading}
            />
          </Modal>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default MenuBuilder;
