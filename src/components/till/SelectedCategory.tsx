"use client";
import Image from "next/image";
import { Category } from "./ItemCategories";
import {
  AddCircleOutline,
  Check,
  Delete,
  DeleteOutline,
  DirectionsBus,
  DirectionsBusOutlined,
  MoreVert,
  RemoveCircleOutline,
  ShoppingCartOutlined,
  Store,
  StorefrontOutlined,
  StoreOutlined,
} from "@mui/icons-material";
import {
  Badge,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SvgIcon,
} from "@mui/material";
import { useContext, useState } from "react";
import { ViewProductIcon } from "../dashboard/inventory/warehouse/icons";
import { ItemContext } from "@/context/ItemContext";
import clsx from "clsx";
import Link from "next/link";

interface SelectedCategoryProps {
  selectedCategory: Category | null;
  addItem: any;
}

const SelectedCategory: React.FC<SelectedCategoryProps> = ({ selectedCategory, addItem }) => {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error("useContext was used outside of the ItemContextProvider");
  }

  const { items, setItems, setTotalAmount, incrementQty, decrementQty } = context;

  const isInCart = (id: number) => {
    return items.some((item) => item.id === id);
  };

  console.log(items, "items");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const totalQty = items.reduce((total, item) => total + item.qty, 0);

  return (
    selectedCategory && (
      <>
        <div className="hidden sm:flex gap-4 flex-col mb-10 w-[95%]">
          {selectedCategory.items?.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div
                key={item.id}
                className="flex gap-4 cursor-pointer items-center"
                onClick={() => addItem(item)}
              >
                <div className="py-4 px-0.5 border border-[#C7C6CF] h-[183px] w-[187px]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="max-w-[160px] max-h-[160px] m-auto"
                  />
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-10 w-full sm:hidden">
          {selectedCategory.items?.map((item) => {
            const cartItem = items.find((i) => i.id === item.id);

            return (
              <div key={item.id} className="flex justify-between items-start">
                <div key={item.id} className="flex flex-col gap-4 cursor-pointer items-center">
                  <div
                    className="py-3 px-2 border border-[#C7C6CF] bg-[#F3F3F5] rounded rounded-lg"
                    style={{ width: "195px", height: "195px" }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      height={180}
                      width={180}
                      style={{ width: "180px", height: "180px" }}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-normal text-[#201F44]">{item.name}</h3>
                    <p className="text-base font-medium text-[#5855B3]">{item.price}</p>
                  </div>
                  {cartItem ? (
                    <div>
                      <RemoveCircleOutline
                        className={clsx(
                          "mr-2 cursor-pointer",
                          cartItem.qty === 0 && "text-gray-300"
                        )}
                        onClick={() => decrementQty(cartItem.id)}
                      />
                      {cartItem.qty}
                      <AddCircleOutline
                        className={clsx("ml-2 cursor-pointer")}
                        onClick={(event) => {
                          event.stopPropagation();
                          incrementQty(cartItem.id);
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className="flex items-center justify-center w-full bg-[#5855B3] rounded-[4px]"
                      onClick={(event) => {
                        event.stopPropagation();
                        addItem(item);
                      }}
                    >
                      <button className="flex px-6 py-2 text-white text-sm font-normal">
                        Add to Cart
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <Link href="/checkout">
            <div
              style={{ position: "fixed", right: 20, bottom: 80 }}
              className="bg-[#5855B3] rounded-full p-4"
            >
              <IconButton>
                <Badge
                  badgeContent={totalQty}
                  sx={{ ".MuiBadge-badge": { color: "#5855B3", bgcolor: "#fff" } }}
                >
                  <ShoppingCartOutlined className="text-white w-6 h-6 " />
                </Badge>
              </IconButton>
            </div>
          </Link>
        </div>
      </>
    )
  );
};

export default SelectedCategory;
