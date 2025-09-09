import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import Add from "../../assets/add.svg";
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
  fetchMenuItemsWithoutStatus,
} from "../../slices/menuSlice";
import { truncateText } from "../../utils/truncateText";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { toast } from "react-toastify";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { CancelOutlined, EditOutlined, MoreVert } from "@mui/icons-material";
import VisibilityOpen from "./VisibilityOpen";
import ConfirmationDialog from "./ConfirmationDialog";
import AddMenuGroup from "./MenuBuilderModals/AddMenuGroup";
import MenuGroup from "./MenuBuilderModals/MenuGroup";
// import AddMenuItem from "./MenuBuilderModals/AddMenuItem";
import CustomInput from "../inputFields/CustomInput";
// import EditCategoryNameModal from "./MenuBuilderModals/EditCategoryNameModal";
import MenuItemForm from "./MenuBuilderModals/NewAddMenuModal";
import { Modifier } from "./components/DisplayModifiers";
import { IoCubeOutline } from "react-icons/io5";
import { SlDocs } from "react-icons/sl";
import { LiaTimesSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const MenuBuilder = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    categories,
    menuGroups,
    menuItemsWithoutStatus,
    totalItems,
    totalPages,
    currentPage: theCurrentPage,
    mgLoading,
  } = useSelector((state: any) => state.menu);
  const { selectedBranch } = useSelector((state: any) => state.branches);
  const [currentPage, setCurrentPage] = useState(theCurrentPage || 1);
  console.log(totalItems, totalPages, currentPage, "allP");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSingleUpload, setSingleUpload] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addMenuGroup, setAddMenuGroup] = useState(false);
  const [addMenuItem, setAddMenuItem] = useState(false);
  const [addModifierModar, setAddModifierModal] = useState(false);
  const [menuGroupLoading, setMenuGroupLoading] = useState(false);
  const [menuItemLoading, setMenuItemLoading] = useState(false);
  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [applyPriceToAll, setApplyPriceToAll] = useState(false);
  const [price, setPrice] = useState("");
  const [selectedMenuItem, setSelectedMenuItem] = useState<any | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);

  // const [editCategoryModalOpen, setEditCategoryModalOpen] = useState(false);
  const [editGroupModalOpen, setEditGroupModalOpen] = useState(false);
  // const [editingCategory, setEditingCategory] = useState<{
  //   id: string;
  //   oldName: string;
  // } | null>(null);
  // const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [newGroupName, setNewGroupName] = useState<string>("");
  const [editingGroup, setEditingGroup] = useState<{
    id: string;
    oldName: string;
  } | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<any | null>(null);
  const [activeGroup, setActiveGroup] = useState<any | null>(null);


  // const router = useRouter();

  // Useeffects
  useEffect(() => {
    if (selectedBranch) {
      dispatch(fetchMenuCategories(selectedBranch.id));
    }
  }, [selectedBranch]);

  // Add new menu category
  const handleAddMenu = () => {
    setIsModalOpen(true);
  };

  // Get men groups and set active category
  const getSubCategory = (category: any) => {
    setActiveCategory(category);
    dispatch(
      fetchMenuGroups({
        branch_id: selectedBranch.id,
        menu_category_name: category.name,
      })
    );
  };

  // Handle edit category and other dropdown functions
  const handleCategoryDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const [categoryEdit, setCategoryEdit] = useState<any>({});
  const handleEditCategoryConfirm = async () => {
    if (categoryEdit) {
      setEditLoading(true);
      try {

        const payload =
        {
          ...categoryEdit,
        }
        console.log("payload", payload)
        const res = await axios.put(
          `${SERVER_DOMAIN}/menu/editMenuCategory`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.status === 200) {
          toast.success("Category name updated successfully");
          // setEditCategoryModalOpen(false);
          setIsModalOpen(false)
          dispatch(fetchMenuCategories(selectedBranch.id));
        }
      } catch (error) {
        toast.error("An error occurred, please try again");
      } finally {
        // setEditLoading(false);
        setCategoryEdit({});
        // setNewCategoryName("");
      }
    }
  };
  const handleDeleteCategory = async (category: any) => {

    if (category) {
      try {
        const res = await axios.delete(
          `${SERVER_DOMAIN}/menu/deleteMenuCategory?category_id=${category._id}&branch_id=${selectedBranch.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        toast.success(res?.data?.message);
        console.log(res);
        dispatch(fetchMenuCategories(selectedBranch.id));
      }
      catch (e) {
        toast.error("An error occurred, please try again");
      }
    }
  };

  // Fetch menu items
  const handleFetchMenuItems = (group: any) => {
    setMenuItemLoading(true); // Set loading to true before fetching
    setActiveGroup(group);
    dispatch(
      fetchMenuItemsWithoutStatus({
        branch_id: selectedBranch.id,
        menu_group_name: group.name,
        page: currentPage || 1,
      })
    ).finally(() => {
      setMenuItemLoading(false); // Set loading to false after fetching
    });
  };

  // Handle edit group and menu group dropdown

  // Implement actions for visibility, edit, and remove
  const handleMenuVisibility = () => {
    handleClose();
    setIsVisibilityOpen(true);
  };

  const handleGroupDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGroupEdit = (group: any) => {
    setEditGroupModalOpen(true);
    setEditingGroup({ id: group._id, oldName: group.name });
    setNewGroupName(group.name);
    handleClose();
  };

  const handleEditGroupConfirm = async () => {
    if (editingGroup) {
      setEditLoading(true);
      try {
        const res = await axios.put(
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

        if (res.status === 200) {
          toast.success("Group name updated successfully");
          setEditGroupModalOpen(false);
          dispatch(
            fetchMenuGroups({
              branch_id: selectedBranch.id,
              menu_category_name: activeCategory?.name,
            })
          );
        }
      } catch (error) {
        toast.error("An error occurred, please try again");
      } finally {
        setEditLoading(false);
        setEditingGroup(null);
        setNewGroupName("");
      }
    }
  };

  // Delete group
  const [confirmationDialog, setConfirmationDialog] = useState({
    open: false,
    item: {},
  });

  const handleGroupDeleteClick = (group: any) => {
    setConfirmationDialog({ open: true, item: group });
    handleClose();
  };

  const handleConfirmGroupDelete = async () => {
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
      if (response.status === 200) {
        // Optionally refresh the list of modifiers after deletion
        toast.success("Item deleted successfully");
        dispatch(
          fetchMenuGroups({
            branch_id: selectedBranch.id,
            menu_category_name: activeCategory?.name,
          })
        );
        // dispatch(fetchMenuItemsByMenuGroup({ branch_id: viewingBranch?._id as any }));
      } else {
        alert("Failed to delete item");
      }
    } catch (error) {
      alert("An error occurred while deleting the item");
    }
  };

  // Add menu group
  const handleGroupName = (value: string) => {
    setGroupName(value);
  };

  const handlePrice = (value: string) => {
    setPrice(value);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApplyPriceToAll(event.target.value === "yes");
  };

  const handleAddMenuGroup = () => {
    setAddMenuGroup(true);
  };

  const handleSaveMenuGroup = async () => {
    setMenuGroupLoading(true);

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const payload = {
      category_name: activeCategory?.name,
      group_name: groupName,
      branch_id: selectedBranch.id,
      price_to_all_items: applyPriceToAll,
      ...(applyPriceToAll && { price: Number(price) }),
    };

    try {
      const response = await axios.post(
        `${SERVER_DOMAIN}/menu/addMenuGroup`,
        payload,
        headers
      );
      dispatch(
        fetchMenuGroups({
          branch_id: selectedBranch.id,
          menu_category_name: activeCategory?.name,
        })
      );
      toast.success(response.data.message || "Menu group added successfully.");

      setGroupName("");
      setApplyPriceToAll(false);
    } catch (error: any) {
      toast.error(
        error.response.data.message || "An error occurred. Please try again."
      );
    } finally {
      setMenuGroupLoading(false);
      setAddMenuGroup(false);
    }
  };

  // const handleFileChange = async (e: any) => {
  //   const file = e.target.files[0];
  //   setImageName(file.name);
  //   try {
  //     const base64 = await convertToBase64(file);
  //     setImage(base64 as string);
  //   } catch (error) {
  //     console.error("Error converting file to base64:", error);
  //   }
  // };

  const handleAddMenuItem = () => {
    setAddMenuItem(true);
  };

  // const handleMenuName = (value: string) => {
  //   setMenuName(value);
  // };
  // const handleMenuDescription = (value: any) => {
  //   setMenuDescription(value);
  // };
  // const handleMenuPrice = (value: string) => {
  //   setMenuPrice(value);
  // };

  const handleMenuItemClick = (item: any) => {
    setSelectedMenuItem(item);
  };

  const [editModifierData, setEditModifierData] = useState<Modifier | null>(null);
  // Modifier
  const handleAddModifier = () => {
    setAddModifierModal(true);
  };
  // console.log("editModifierData", editModifierData)


  // const editModifier = (id: string) => {
  //       setAddModifierModal(true);
  // };
  useEffect(() => {
    // editModifierId
    editModifierData && setAddModifierModal(true);

  }, [editModifierData])

  // Called when the page changes
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    event.preventDefault();
    setCurrentPage(page);

    dispatch(
      fetchMenuItemsWithoutStatus({
        branch_id: selectedBranch.id,
        menu_group_name: activeGroup?.name,
        page: page,
      })
    );
    console.log(`Fetching menu items for page ${page}`);
  };

  return (
    <div>
      {" "}
      <DashboardLayout>
        <TopMenuNav pathName="Menu" />
        <div>
          <div className="mt-[40px]">
            <div className="flex items-center justify-between">
              <div className="border border-purple500 bg-purple500 w-fit rounded-[5px] px-[24px] py-[10px] font-[500] text-[#ffffff]">
                <button
                  className="text-[16px] flex items-center gap-[8px]"
                  onClick={handleAddMenu}
                >
                  <img src={Add} alt="" /> Add new menu category
                </button>
              </div>
              <div></div>
            </div>

            <div className="flex">
              <div className="mt-[24px]">
                <nav className="flex flex-col gap-[8px]">
                  {categories?.map((category: any) => (
                    <div
                      onClick={() => getSubCategory(category)}
                      key={category._id}
                      className={`${activeCategory?.name === category?.name &&
                        "bg-purple100 text-purple600 font-[500]"
                        } text-grey200 hover:bg-purple100 uppercase flex justify-between items-center w-[201px] text-[16px] font-[400] py-[12px] px-[8px] cursor-pointer`}
                    >
                      {truncateText(category.name, 10)}
                      {activeCategory?.name === category.name && (
                        <IconButton
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          onClick={(event) => handleCategoryDropdown(event)}
                        >
                          <MoreVert />
                        </IconButton>
                      )}
                      {activeCategory?.name === category.name && (
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl2}
                          keepMounted
                          open={Boolean(anchorEl2)}
                          onClose={handleClose2}
                        >
                          <MenuItem
                            // onClick={() => handleCategoryEdit(category)}
                            onClick={() => { setSingleUpload(true); setIsModalOpen(false); setCategoryEdit({ image: category.image, menu_category_name: category.name, branch_id: category.branch, category_id: category._id }); handleClose2(); setEditMode(true); }}
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
                          <MenuItem
                            onClick={() => handleDeleteCategory(category)}
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
                            <span style={{ fontWeight: "300" }}>Delete</span>
                          </MenuItem>
                        </Menu>
                      )}
                      {activeCategory?.name === category.name ? (
                        <img src={activeArrow} alt="activearrow" />
                      ) : null}
                    </div>
                  ))}
                </nav>
              </div>
              <div className="flex-grow ">
                <>
                  <MenuGroup
                    mgLoading={mgLoading}
                    menuGroups={menuGroups}
                    handleFetchMenuItems={handleFetchMenuItems}
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    handleMenuVisibility={handleMenuVisibility}
                    menuItemLoading={menuItemLoading}
                    truncateText={truncateText}
                    activeGroup={activeGroup}
                    handleGroupDropdown={handleGroupDropdown}
                    handleGroupEdit={handleGroupEdit}
                    handleGroupDeleteClick={handleGroupDeleteClick}
                    activeCategory={activeCategory}
                    handleAddMenuGroup={handleAddMenuGroup}
                    subMenuContent={menuItemsWithoutStatus}
                    selectedMenuItem={selectedMenuItem}
                    handleMenuItemClick={handleMenuItemClick}
                    handleAddMenuItem={handleAddMenuItem}
                    totalItems={totalItems}
                    currentPage={currentPage}
                    itemsPerPage={10}
                    handlePageChange={handlePageChange}
                  />
                </>
                <Modifiers
                  activeSubMenu={activeGroup}
                  selectedBranch={selectedBranch}
                  selectedMenuItem={selectedMenuItem}
                  addModifierModar={addModifierModar}
                  setAddModifierModal={setAddModifierModal}
                  handleAddModifier={handleAddModifier}
                  setEditModifierData={setEditModifierData}
                  editModifierData={editModifierData}
                />
              </div>
            </div>
          </div>

          {/* MODALS */}
          <Modal isOpen={isSingleUpload} onClose={() => setSingleUpload(false)}>
            <AddMenuCategory setIsModalOpen={setSingleUpload} editCategory={categoryEdit} handleEditCategoryConfirm={handleEditCategoryConfirm} setCategoryEdit={setCategoryEdit} setEditMode={setEditMode} editMode={editMode} />
          </Modal>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            {/* setBulkUpload */}
            <div className="relative bg-white">
              <LiaTimesSolid className="absolute cursor-pointer top-4 right-4" onClick={() => setIsModalOpen(false)} />

              <h4 className="text-[16px] font-semibold w-fit mx-auto">New Menu Category</h4>
              <div>
                <div className="p-4 rounded-md">

                  <div className="flex items-center gap-4 p-2 my-6 border border-gray-300 rounded-md cursor-pointer hover:border-orange-500"
                    onClick={() => { setSingleUpload(true); setIsModalOpen(false) }}>
                    <div className="p-2 bg-[#FFF5F0] w-fit">
                      <IoCubeOutline />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-semibold">Single Product</h4>
                      <p className="text-sm ">Add product manually</p>
                    </div>
                  </div>
                  <Link to="bulk-upload">
                    <div className="flex items-center gap-4 p-2 my-6 border border-gray-300 rounded-md cursor-pointer hover:border-orange-500" >
                      <div className="p-2 bg-[#FFF5F0] w-fit">
                        <SlDocs />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-semibold">Bulk Upload</h4>
                        <p className="text-sm ">Upload products in bulk using a csv file</p>
                      </div>
                    </div>
                  </Link>
                </div>

              </div>
            </div>
          </Modal>

          {/* Edit selected category */}
          {/* <Modal
            isOpen={editCategoryModalOpen}
            onClose={() => setEditCategoryModalOpen(false)}
          >
            <EditCategoryNameModal
              newCategoryName={newCategoryName}
              setNewCategoryName={setNewCategoryName}
              handleEditCategoryConfirm={handleEditCategoryConfirm}
              editLoading={editLoading}
              setEditCategoryModalOpen={setEditCategoryModalOpen}
            />
          </Modal> */}

          {/* Edit selected group, visibility and delete */}
          <Modal
            isOpen={isVisibilityOpen}
            onClose={() => setIsVisibilityOpen(false)}
          >
            <VisibilityOpen setIsVisibilityOpen={setIsVisibilityOpen} />
          </Modal>

          <Modal
            isOpen={editGroupModalOpen}
            onClose={() => setEditGroupModalOpen(false)}
          >
            {/* <EditOpen setIsEditOpen={setIsEditOpen} /> */}
            <div className=" w-[539px] py-[32px] px-[52px]">
              <h2 className="text-[24px] mb-[11px] font-[500] text-purple500">
                Edit Group Name
              </h2>
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
                  onClick={() => setEditGroupModalOpen(false)}
                  className="bg-[#F8F8F8] text-[#5855B3] rounded-[6px] px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>

          <ConfirmationDialog
            open={confirmationDialog.open}
            onClose={() => setConfirmationDialog({ open: false, item: {} })}
            onConfirm={handleConfirmGroupDelete}
            message={`Are you sure you want to delete this item?`}
          />

          {/* Add menu group */}
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

          {/* Add menu item */}
          <Modal isOpen={addMenuItem} onClose={() => setAddMenuItem(false)}>
            {/* <AddMenuItem
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
            /> */}
            <MenuItemForm
              onCancel={() => setAddMenuItem(false)}
              activeCategory={activeCategory}
            />
          </Modal>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default MenuBuilder;
