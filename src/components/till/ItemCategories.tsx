"use client";

import { tillCategories } from "@/constant";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import SelectedCategory from "./SelectedCategory";

interface Item {
  id: number;
  name: string;
  price: string;
  image: StaticImageData;
  qty?: number;
}

export interface Category {
  id: number;
  name: string;
  image: StaticImageData;
  items?: Item[];
}

const ItemCategories = ({ addItem }: any) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(tillCategories[0]);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="px-4">
      <div className="flex items-center justify-between sm:hidden px-4 mb-6">
        <h4 className="text-[#201F44] text-base font-medium">Category</h4>
        <span className="text-[#5855B3] text-base font-light">See All</span>
      </div>
      <div className="overflow-auto whitespace-nowrap scrollbar-hide">
        {tillCategories.map((product, index) => (
          <div
            key={index}
            className={clsx(
              "font-normal text-base rounded-[100px] border border-[#9d9dac] overflow-auto inline-block mr-2 sm:mr-4 px-6 py-2 cursor-pointer",
              {
                "text-white text-base font-semibold bg-[#5855B3]":
                  selectedCategory?.id === product.id,
                "text-[#404A49] border border-[#9d9dac]": selectedCategory?.id !== product.id,
              }
            )}
            onClick={() => handleCategoryClick(product as any)}
          >
            <h6 className={clsx("")}>{product.name}</h6>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between sm:hidden px-4 mt-8 mb-6">
        <h4 className="text-[#201F44] text-base font-medium">Most Popular Products</h4>
        <span className="text-[#5855B3] text-base font-light">See All</span>
      </div>
      <SelectedCategory selectedCategory={selectedCategory} addItem={addItem} />
    </div>
  );
};

export default ItemCategories;
