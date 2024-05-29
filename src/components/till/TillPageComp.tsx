"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "@/components/till/Till.module.css";
import Rightbar from "@/components/till/Rightbar";
import InputField from "@/components/till/InputField";
import ItemCategories from "@/components/till/ItemCategories";
import { ItemContext } from "@/context/ItemContext";
import Head from "next/head";

type Item = {
  id: number;
  name: string;
  price: string;
  qty: number;
  image: string;
};

const TillPageComp = () => {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error("useContext was used outside of the ItemContextProvider");
  }

  const { items, setItems, setTotalAmount } = context;

  useEffect(() => {
    const totalAmount = items.reduce((total: number, item: { qty: number; price: string }) => {
      const itemPrice = Number(item.price.replace(/[^0-9.-]+/g, "")); // Remove non-numeric characters
      return total + itemPrice * item.qty;
    }, 0);

    setTotalAmount(totalAmount);
  }, [items, setTotalAmount]);

  const addItem = (newItem: Item) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        // If the item already exists, return a new array with the existing item's quantity incremented
        return prevItems.map((item) =>
          item.id === newItem.id ? { ...item, qty: (item.qty || 1) + 1 } : item
        );
      } else {
        // If the item does not exist, add it to the array
        return [...prevItems, { ...newItem, qty: 1 }];
      }
    });
  };
  console.log(context, "aaaa");

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <InputField />
          <div className="self-start max-w-[100vw] sm:max-w-[50vw] mr-1">
            <ItemCategories addItem={addItem} />
          </div>
        </div>
        <div className={styles.side}>
          <Rightbar items={items} setItems={setItems} />
        </div>
      </div>
    </div>
  );
};

export default TillPageComp;
