import { IconButton, Menu, MenuItem } from "@mui/material";
import AddWhite from "../../../assets/addWhite.svg";
import { CancelOutlined, EditOutlined, MoreVert, VisibilityOutlined } from "@mui/icons-material";
import chevron_right from "../../../assets/chevron_right.svg";
import activeArrow from "../../../assets/activeArrow.svg";
import CoffeeImg from "../../../assets/coffeeImg.png";

interface Props {
  mgLoading: boolean;
  menuGroups: any[];
  activeSubMenu: any;
  setActiveSubMenu: (name: string) => void;
  handleFetchMenuItems: () => void;
  anchorEl: HTMLElement | null;
  handleClick: (event: React.MouseEvent<HTMLElement>, name: string) => void;
  handleClose: () => void;
  handleMenuVisibility: () => void;
  handleEdit: (group: any) => void;
  handleDeleteClick: (group: any) => void;
  handleAddMenuGroup: () => void;
  menuItemLoading: boolean;
  subMenuContent: any[];
  selectedMenuItem: any;
  handleMenuItemClick: (name: string) => void;
  handleAddMenuItem: () => void;
  truncateText: (text: string, maxLength: number) => string;
}

const MenuGroup: React.FC<Props> = ({
  mgLoading,
  menuGroups,
  activeSubMenu,
  setActiveSubMenu,
  handleFetchMenuItems,
  anchorEl,
  handleClick,
  handleClose,
  handleMenuVisibility,
  handleEdit,
  handleDeleteClick,
  handleAddMenuGroup,
  menuItemLoading,
  subMenuContent,
  selectedMenuItem,
  handleMenuItemClick,
  handleAddMenuItem,
  truncateText,
}) => {
  return (
    <div className="mt-[24px] w-full border p-[16px]">
      <div className=" flex gap-[16px] items-start">
        <div className=" w-[204px]">
          <p className=" font-[400] text-[12px] text-[#606060]">Menu Group</p>
          <div className="">
            {mgLoading ? (
              <div className="flex justify-center items-center h-[200px]">
                <p className="text-[16px] font-[400] text-grey500">Loading menu groups...</p>
              </div>
            ) : (
              menuGroups.map((group: any) => (
                <div key={group._id} className="flex items-center justify-between">
                  <p
                    className={`${
                      activeSubMenu === group.name ? "font-[500] text-[#5855B3]" : "text-grey200"
                    } hover:bg-purple100 flex justify-between cursor-pointer items-center w-[201px] text-[16px] font-[400] py-[12px] px-[8px]`}
                    key={group._id}
                    onClick={() => {
                      setActiveSubMenu(group.name);
                      handleFetchMenuItems();
                    }}
                  >
                    {truncateText(group.name, 15)}
                    {activeSubMenu === group.name && (
                      <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={(event) => handleClick(event, group.name)}
                      >
                        <MoreVert />
                      </IconButton>
                    )}
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={handleMenuVisibility}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <VisibilityOutlined
                          sx={{
                            fontSize: "20px",
                            fontWeight: "300",
                          }}
                        />
                        <span style={{ fontWeight: "300" }}>Menu Visibility</span>
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleEdit(group)}
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
                        onClick={() => handleDeleteClick(group)}
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
                      </MenuItem>
                    </Menu>
                    {activeSubMenu === group.name ? (
                      <img src={activeArrow} alt="activearrow" />
                    ) : (
                      <img src={chevron_right} alt="" />
                    )}
                  </p>
                </div>
              ))
            )}

            <div
              className=" w-[196px]  px-[10px] py-[6px] font-[500] text-purple500"
              onClick={handleAddMenuGroup}
            >
              <button className="text-[16px] flex items-center gap-[8px]">
                <img src={AddWhite} alt="" /> Add Menu Group
              </button>
            </div>
          </div>
        </div>

        <div className=" flex-grow space-y-[16px]">
          <p className=" font-[400] text-[12px] text-[#606060]">Menu Item</p>
          <div className=" flex items-start justify-between ">
            <p className=" text-[16px] font-[500] text-[#5855B3]">Type</p>
            <div className=" ">
              <button
                className="w-[196px]  px-[10px] py-[6px] font-[500] text-purple500 text-[16px] flex items-center gap-[8px]"
                onClick={handleAddMenuItem}
              >
                <img src={AddWhite} alt="" /> Add Menu Item
              </button>
            </div>
          </div>
          {menuItemLoading ? (
            <div className="flex justify-center items-center h-[200px]">
              <p className="text-[16px] font-[400] text-grey500">Loading menu items...</p>
            </div>
          ) : (
            subMenuContent.map((menuItem, index) => (
              <div>
                <div key={index}>
                  {menuItem.data.map((item: any, itemIndex: any) => (
                    <div className="" key={itemIndex}>
                      <div
                        className={`flex items-center justify-between py-[8px] px-[16px] cursor-pointer mb-2
          ${
            selectedMenuItem === item.name
              ? "bg-[#ebebeb] text-purple500"
              : "bg-[#F8F8F8] text-grey500"
          }`}
                        onClick={() => handleMenuItemClick(item.name)}
                      >
                        <div className="flex gap-[8px] items-center">
                          <img
                            src={item.img || CoffeeImg}
                            alt=""
                            className="h-[50px] w-[60px] object-cover rounded"
                          />
                          <div className="">
                            <p className="text-[12px] font-[400]">Item</p>
                            <div key={itemIndex}>
                              <p className="leading-[24px] text-[16px] font-normal capitalize">
                                {item.name}
                              </p>
                              {/* <p className="text-[12px] font-[400]">Modifiers (6)</p> */}
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          <p className="text-[16px] font-[500]">
                            &#8358;
                            {Number(item.price).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {menuItem.data.length === 0 && (
                  <div className=" flex justify-center items-center h-[200px]">
                    <p className="text-[16px] font-[400] text-grey500">No menu items</p>
                  </div>
                )}
              </div>
            ))
          )}

          {subMenuContent.length > 1 && (
            <div className=" flex items-center justify-end">
              <button
                className="w-[196px] border border-[#5955B3] rounded-[5px]  px-[16px] py-[8px] font-[500] text-purple500 text-[16px] flex items-center gap-[8px]"
                onClick={handleAddMenuItem}
              >
                <img src={AddWhite} alt="" /> Add Menu Item
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuGroup;
