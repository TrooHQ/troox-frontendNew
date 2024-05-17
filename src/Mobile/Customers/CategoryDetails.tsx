import { useEffect, useState } from "react";

import Add from "../assets/plusIconRound.svg";
// import Adds from "../assets/plusIconn.svg";
import Minus from "../assets/MinusRound.svg";
// import { Link } from "react-router-dom";
import TopMenuNav from "./TopMenuNav";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";

interface BasketItem {
  id: string;
  count: number;
  menuItem: any;
  selectedOptions: any[];
  totalPrice: number;
}

interface Details {
  name: string;
  _id: number;
  business_name: string;
  menu_category_name: string;
  menu_group_name: string;
  menu_item_name: string;
  menu_item_image: string;
  menu_item_price: string;
}

export const CategoryDetails = () => {
  const [menuGroup, setMenuGroup] = useState<Details[]>([]);
  const [menuItems, setMenuItems] = useState<Details[]>([]);

  const business_identifier = sessionStorage.getItem("business_identifier");
  const token = sessionStorage.getItem("token");

  const getGroups = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/menu/getCustomerMenuGroup/?business_identifier=${business_identifier}`,
        headers
      );
      console.log(
        "Business groups Retrieved successfully:",
        response.data.data
      );
      setMenuGroup(response.data.data);
      if (response.data.data && response.data.data.length > 0) {
        setSelectedGroup(response.data.data[0].name);
      }
    } catch (error) {
      console.error("Error getting Business Details:", error);
    }
  };

  const getItems = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/menu/getCustomerMenuItem/?business_identifier=${business_identifier}`,
        headers
      );
      console.log("Business items Retrieved successfully:", response.data.data);
      setMenuItems(response.data.data);
    } catch (error) {
      console.error("Error getting Business Details:", error);
    }
  };

  useEffect(() => {
    getGroups();
    getItems();
  }, []);
  const { id } = useParams();
  const [ids, setIds] = useState<string[]>([]);
  if (id) {
    sessionStorage.setItem("menuId", id);
  }

  const [selectedGroup, setSelectedGroup] = useState("");
  // const data = [
  //   {
  //     category: "Breakfast",
  //     image: `${image1}`,
  //     group: [
  //       {
  //         groupCategory: "Breakfast Meal",
  //         name: "Toast",
  //         items: [
  //           {
  //             id: 1,
  //             title: "Pap and Akara1",
  //             image: `${Pap}`,
  //             price: "1200",
  //             details: "Pap served with brown crunchy akara",
  //             options: [
  //               {
  //                 label: "Add Milk (+#500)",
  //                 value: "AddMilk",
  //                 price: "500",
  //               },
  //             ],
  //           },
  //           {
  //             id: 2,
  //             title: "Sandwich1",
  //             image: `${Sandwich}`,
  //             price: "1100",
  //             details: "Spicy Sandwich",
  //             options: [
  //               {
  //                 label: "Add Chicken Fillet (+#500)",
  //                 value: "chickenFillet",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add Lettuse (+#500)",
  //                 value: "lettuse",
  //                 price: "500",
  //               },
  //             ],
  //           },
  //           {
  //             id: 3,
  //             title: "Yam and Egg Sauce1",
  //             image: `${EggYam}`,
  //             price: "1230",
  //             details: "Yam served with Egg Sauce",
  //             options: [
  //               {
  //                 label: "Add Tomato Sauce (+#500)",
  //                 value: "tomatoSauce",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add Lettuse (+#500)",
  //                 value: "lettuse",
  //                 price: "500",
  //               },
  //             ],
  //           },
  //           {
  //             id: 4,
  //             title: "Toast and Egg1",
  //             image: `${ToastEgg}`,
  //             price: "1250",
  //             details: "Toast Bread served with Egg",
  //             options: [
  //               {
  //                 label: "Add egg Sauce (+#500)",
  //                 value: "eggSauce",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add More Pepper (+#1000)",
  //                 value: "morePepper",
  //                 price: "1000",
  //               },
  //             ],
  //           },
  //           {
  //             id: 5,
  //             title: "Yam and Tomato Sauce1",
  //             image: `${Yam}`,
  //             price: "2000",
  //             details: "Yam served with Tomato Sauce",
  //             options: [
  //               {
  //                 label: "Add Chicken Fillet (+#500)",
  //                 value: "chickenFillet",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add Chicken (+#500)",
  //                 value: "chicken",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add More Pepper (+#1000)",
  //                 value: "morePepper",
  //                 price: "1000",
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         groupCategory: "Breakfast Meal2",
  //         name: "Oats and Meal",
  //         items: [
  //           {
  //             id: 1,
  //             title: "Pap and Akara",
  //             image: `${Pap}`,
  //             price: "1200",
  //             details: "Pap served with brown crunchy akara",
  //             options: [
  //               {
  //                 label: "Add Milk (+#500)",
  //                 value: "AddMilk",
  //                 price: "500",
  //               },
  //             ],
  //           },
  //           {
  //             id: 2,
  //             title: "Sandwich",
  //             image: `${Sandwich}`,
  //             price: "1100",
  //             details: "Spicy Sandwich",
  //             options: [
  //               {
  //                 label: "Add Chicken Fillet (+#500)",
  //                 value: "chickenFillet",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add Lettuse (+#500)",
  //                 value: "lettuse",
  //                 price: "500",
  //               },
  //             ],
  //           },
  //           {
  //             id: 3,
  //             title: "Yam and Egg Sauce",
  //             image: `${EggYam}`,
  //             price: "1230",
  //             details: "Yam served with Egg Sauce",
  //             options: [
  //               {
  //                 label: "Add Tomato Sauce (+#500)",
  //                 value: "tomatoSauce",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add Lettuse (+#500)",
  //                 value: "lettuse",
  //                 price: "500",
  //               },
  //             ],
  //           },
  //           {
  //             id: 4,
  //             title: "Toast and Egg",
  //             image: `${ToastEgg}`,
  //             price: "1250",
  //             details: "Toast Bread served with Egg",
  //             options: [
  //               {
  //                 label: "Add egg Sauce (+#500)",
  //                 value: "eggSauce",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add More Pepper (+#1000)",
  //                 value: "morePepper",
  //                 price: "1000",
  //               },
  //             ],
  //           },
  //           {
  //             id: 5,
  //             title: "Yam and Tomato Sauce",
  //             image: `${Yam}`,
  //             price: "2000",
  //             details: "Yam served with Tomato Sauce",
  //             options: [
  //               {
  //                 label: "Add Chicken Fillet (+#500)",
  //                 value: "chickenFillet",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add Chicken (+#500)",
  //                 value: "chicken",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add More Pepper (+#1000)",
  //                 value: "morePepper",
  //                 price: "1000",
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         groupCategory: "Breakfast Meal3",
  //         name: "Coffee",
  //         items: [
  //           {
  //             id: 1,
  //             title: "Pap and Akara",
  //             image: `${Pap}`,
  //             price: "1200",
  //             details: "Pap served with brown crunchy akara",
  //             options: [
  //               {
  //                 label: "Add Milk (+#500)",
  //                 value: "AddMilk",
  //                 price: "500",
  //               },
  //             ],
  //           },
  //           {
  //             id: 2,
  //             title: "Sandwich",
  //             image: `${Sandwich}`,
  //             price: "1100",
  //             details: "Spicy Sandwich",
  //             options: [
  //               {
  //                 label: "Add Chicken Fillet (+#500)",
  //                 value: "chickenFillet",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add Lettuse (+#500)",
  //                 value: "lettuse",
  //                 price: "500",
  //               },
  //             ],
  //           },
  //           {
  //             id: 3,
  //             title: "Yam and Egg Sauce",
  //             image: `${EggYam}`,
  //             price: "1230",
  //             details: "Yam served with Egg Sauce",
  //             options: [
  //               {
  //                 label: "Add Tomato Sauce (+#500)",
  //                 value: "tomatoSauce",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add Lettuse (+#500)",
  //                 value: "lettuse",
  //                 price: "500",
  //               },
  //             ],
  //           },
  //           {
  //             id: 4,
  //             title: "Toast and Egg",
  //             image: `${ToastEgg}`,
  //             price: "1250",
  //             details: "Toast Bread served with Egg",
  //             options: [
  //               {
  //                 label: "Add egg Sauce (+#500)",
  //                 value: "eggSauce",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add More Pepper (+#1000)",
  //                 value: "morePepper",
  //                 price: "1000",
  //               },
  //             ],
  //           },
  //           {
  //             id: 5,
  //             title: "Yam and Tomato Sauce",
  //             image: `${Yam}`,
  //             price: "2000",
  //             details: "Yam served with Tomato Sauce",
  //             options: [
  //               {
  //                 label: "Add Chicken Fillet (+#500)",
  //                 value: "chickenFillet",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add Chicken (+#500)",
  //                 value: "chicken",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add More Pepper (+#1000)",
  //                 value: "morePepper",
  //                 price: "1000",
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         groupCategory: "Breakfast Meal4",
  //         name: "Coffee Bread",
  //         items: [
  //           {
  //             id: 1,
  //             title: "Pap and Akara",
  //             image: `${Pap}`,
  //             price: "1200",
  //             details: "Pap served with brown crunchy akara",
  //             options: [
  //               {
  //                 label: "Add Milk (+#500)",
  //                 value: "AddMilk",
  //                 price: "500",
  //               },
  //             ],
  //           },
  //           {
  //             id: 2,
  //             title: "Sandwich",
  //             image: `${Sandwich}`,
  //             price: "1100",
  //             details: "Spicy Sandwich",
  //             options: [
  //               {
  //                 label: "Add Chicken Fillet (+#500)",
  //                 value: "chickenFillet",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add Lettuse (+#500)",
  //                 value: "lettuse",
  //                 price: "500",
  //               },
  //             ],
  //           },
  //           {
  //             id: 3,
  //             title: "Yam and Egg Sauce",
  //             image: `${EggYam}`,
  //             price: "1230",
  //             details: "Yam served with Egg Sauce",
  //             options: [
  //               {
  //                 label: "Add Tomato Sauce (+#500)",
  //                 value: "tomatoSauce",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add Lettuse (+#500)",
  //                 value: "lettuse",
  //                 price: "500",
  //               },
  //             ],
  //           },
  //           {
  //             id: 4,
  //             title: "Toast and Egg",
  //             image: `${ToastEgg}`,
  //             price: "1250",
  //             details: "Toast Bread served with Egg",
  //             options: [
  //               {
  //                 label: "Add egg Sauce (+#500)",
  //                 value: "eggSauce",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add More Pepper (+#1000)",
  //                 value: "morePepper",
  //                 price: "1000",
  //               },
  //             ],
  //           },
  //           {
  //             id: 5,
  //             title: "Yam and Tomato Sauce",
  //             image: `${Yam}`,
  //             price: "2000",
  //             details: "Yam served with Tomato Sauce",
  //             options: [
  //               {
  //                 label: "Add Chicken Fillet (+#500)",
  //                 value: "chickenFillet",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add Chicken (+#500)",
  //                 value: "chicken",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add More Pepper (+#1000)",
  //                 value: "morePepper",
  //                 price: "1000",
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     category: "Lunch",
  //     image: `${image2}`,
  //     group: [
  //       {
  //         groupCategory: "Lunch",
  //         name: "Toast",
  //         items: [
  //           {
  //             id: 1,
  //             title: "Pap and Akara",
  //             image: `${Pap}`,
  //             price: "1200",
  //             details: "Pap served with brown crunchy akara",
  //             options: [
  //               {
  //                 label: "Add Milk (+#500)",
  //                 value: "AddMilk",
  //                 price: "500",
  //               },
  //             ],
  //           },
  //           {
  //             id: 2,
  //             title: "Sandwich",
  //             image: `${Sandwich}`,
  //             price: "1100",
  //             details: "Spicy Sandwich",
  //             options: [
  //               {
  //                 label: "Add Chicken Fillet (+#500)",
  //                 value: "chickenFillet",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add Lettuse (+#500)",
  //                 value: "lettuse",
  //                 price: "500",
  //               },
  //             ],
  //           },
  //           {
  //             id: 3,
  //             title: "Yam and Egg Sauce",
  //             image: `${EggYam}`,
  //             price: "1230",
  //             details: "Yam served with Egg Sauce",
  //             options: [
  //               {
  //                 label: "Add Tomato Sauce (+#500)",
  //                 value: "tomatoSauce",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add Lettuse (+#500)",
  //                 value: "lettuse",
  //                 price: "500",
  //               },
  //             ],
  //           },
  //           {
  //             id: 4,
  //             title: "Toast and Egg",
  //             image: `${ToastEgg}`,
  //             price: "1250",
  //             details: "Toast Bread served with Egg",
  //             options: [
  //               {
  //                 label: "Add egg Sauce (+#500)",
  //                 value: "eggSauce",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add More Pepper (+#1000)",
  //                 value: "morePepper",
  //                 price: "1000",
  //               },
  //             ],
  //           },
  //           {
  //             id: 5,
  //             title: "Yam and Tomato Sauce",
  //             image: `${Yam}`,
  //             price: "2000",
  //             details: "Yam served with Tomato Sauce",
  //             options: [
  //               {
  //                 label: "Add Chicken Fillet (+#500)",
  //                 value: "chickenFillet",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add Chicken (+#500)",
  //                 value: "chicken",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add More Pepper (+#1000)",
  //                 value: "morePepper",
  //                 price: "1000",
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         groupCategory: "Lunch",
  //         name: "Oats and Meal",
  //         items: [
  //           {
  //             id: 1,
  //             title: "Pap and Akara",
  //             image: `${Pap}`,
  //             price: "1200",
  //             details: "Pap served with brown crunchy akara",
  //             options: [
  //               {
  //                 label: "Add Milk (+#500)",
  //                 value: "AddMilk",
  //                 price: "500",
  //               },
  //             ],
  //           },
  //           {
  //             id: 2,
  //             title: "Sandwich",
  //             image: `${Sandwich}`,
  //             price: "1100",
  //             details: "Spicy Sandwich",
  //             options: [
  //               {
  //                 label: "Add Chicken Fillet (+#500)",
  //                 value: "chickenFillet",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add Lettuse (+#500)",
  //                 value: "lettuse",
  //                 price: "500",
  //               },
  //             ],
  //           },
  //           {
  //             id: 3,
  //             title: "Yam and Egg Sauce",
  //             image: `${EggYam}`,
  //             price: "1230",
  //             details: "Yam served with Egg Sauce",
  //             options: [
  //               {
  //                 label: "Add Tomato Sauce (+#500)",
  //                 value: "tomatoSauce",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add Lettuse (+#500)",
  //                 value: "lettuse",
  //                 price: "500",
  //               },
  //             ],
  //           },
  //           {
  //             id: 4,
  //             title: "Toast and Egg",
  //             image: `${ToastEgg}`,
  //             price: "1250",
  //             details: "Toast Bread served with Egg",
  //             options: [
  //               {
  //                 label: "Add egg Sauce (+#500)",
  //                 value: "eggSauce",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add More Pepper (+#1000)",
  //                 value: "morePepper",
  //                 price: "1000",
  //               },
  //             ],
  //           },
  //           {
  //             id: 5,
  //             title: "Yam and Tomato Sauce",
  //             image: `${Yam}`,
  //             price: "2000",
  //             details: "Yam served with Tomato Sauce",
  //             options: [
  //               {
  //                 label: "Add Chicken Fillet (+#500)",
  //                 value: "chickenFillet",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add Chicken (+#500)",
  //                 value: "chicken",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add More Pepper (+#1000)",
  //                 value: "morePepper",
  //                 price: "1000",
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         groupCategory: "Lunch",
  //         name: "Coffee",
  //         items: [
  //           {
  //             id: 1,
  //             title: "Pap and Akara",
  //             image: `${Pap}`,
  //             price: "1200",
  //             details: "Pap served with brown crunchy akara",
  //             options: [
  //               {
  //                 label: "Add Milk (+#500)",
  //                 value: "AddMilk",
  //                 price: "500",
  //               },
  //             ],
  //           },
  //           {
  //             id: 2,
  //             title: "Sandwich",
  //             image: `${Sandwich}`,
  //             price: "1100",
  //             details: "Spicy Sandwich",
  //             options: [
  //               {
  //                 label: "Add Chicken Fillet (+#500)",
  //                 value: "chickenFillet",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add Lettuse (+#500)",
  //                 value: "lettuse",
  //                 price: "500",
  //               },
  //             ],
  //           },
  //           {
  //             id: 3,
  //             title: "Yam and Egg Sauce",
  //             image: `${EggYam}`,
  //             price: "1230",
  //             details: "Yam served with Egg Sauce",
  //             options: [
  //               {
  //                 label: "Add Tomato Sauce (+#500)",
  //                 value: "tomatoSauce",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add Lettuse (+#500)",
  //                 value: "lettuse",
  //                 price: "500",
  //               },
  //             ],
  //           },
  //           {
  //             id: 4,
  //             title: "Toast and Egg",
  //             image: `${ToastEgg}`,
  //             price: "1250",
  //             details: "Toast Bread served with Egg",
  //             options: [
  //               {
  //                 label: "Add egg Sauce (+#500)",
  //                 value: "eggSauce",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add More Pepper (+#1000)",
  //                 value: "morePepper",
  //                 price: "1000",
  //               },
  //             ],
  //           },
  //           {
  //             id: 5,
  //             title: "Yam and Tomato Sauce",
  //             image: `${Yam}`,
  //             price: "2000",
  //             details: "Yam served with Tomato Sauce",
  //             options: [
  //               {
  //                 label: "Add Chicken Fillet (+#500)",
  //                 value: "chickenFillet",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add Chicken (+#500)",
  //                 value: "chicken",
  //                 price: "500",
  //               },
  //               {
  //                 label: "Add More Pepper (+#1000)",
  //                 value: "morePepper",
  //                 price: "1000",
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //     // items: [
  //     //   {
  //     //     id: 33,
  //     //     title: "Fried Rice",
  //     //     image: `${FriedRice}`,
  //     //     price: "2000",
  //     //     details: "Fried Rice served with Chicken",
  //     //     options: [
  //     //       {
  //     //         label: "Add egg Sauce (+#500)",
  //     //         value: "eggSauce",
  //     //         price: "500",
  //     //       },
  //     //       {
  //     //         label: "Add More Pepper (+#1000)",
  //     //         value: "morePepper",
  //     //         price: "1000",
  //     //       },
  //     //     ],
  //     //   },
  //     //   {
  //     //     id: 43,
  //     //     title: "Village Jollof Rice",
  //     //     image: `${VillageRice}`,
  //     //     price: "3000",
  //     //     details: "Yam served with Tomato Sauce",
  //     //     options: [
  //     //       {
  //     //         label: "Add egg Sauce (+#500)",
  //     //         value: "eggSauce",
  //     //         price: "500",
  //     //       },
  //     //       {
  //     //         label: "Add More Pepper (+#1000)",
  //     //         value: "morePepper",
  //     //         price: "1000",
  //     //       },
  //     //     ],
  //     //   },
  //     //   {
  //     //     id: 44,
  //     //     title: "Semo",
  //     //     image: `${semo}`,
  //     //     price: "1500",
  //     //     details: "Yam served with Tomato Sauce",
  //     //     options: [
  //     //       {
  //     //         label: "Add egg Sauce (+#500)",
  //     //         value: "eggSauce",
  //     //         price: "500",
  //     //       },
  //     //       {
  //     //         label: "Add More Pepper (+#1000)",
  //     //         value: "morePepper",
  //     //         price: "1000",
  //     //       },
  //     //     ],
  //     //   },

  //     //   {
  //     //     id: 45,
  //     //     title: "Ofada Rice",
  //     //     image: `${OfadaRice}`,
  //     //     price: "1000",
  //     //     details: "Yam served with Tomato Sauce",
  //     //     options: [
  //     //       {
  //     //         label: "Add egg Sauce (+#500)",
  //     //         value: "eggSauce",
  //     //         price: "500",
  //     //       },
  //     //       {
  //     //         label: "Add More Pepper (+#1000)",
  //     //         value: "morePepper",
  //     //         price: "1000",
  //     //       },
  //     //     ],
  //     //   },
  //     //   {
  //     //     id: 46,
  //     //     title: "Poundo Yam",
  //     //     image: `${PoundoYam}`,
  //     //     price: "2500",
  //     //     details: "Pounded yam with Egusi soup",
  //     //     options: [
  //     //       {
  //     //         label: "Add egg (+#500)",
  //     //         value: "eggSauce",
  //     //         price: "500",
  //     //       },
  //     //       {
  //     //         label: "Add More Pepper (+#1000)",
  //     //         value: "morePepper",
  //     //         price: "1000",
  //     //       },
  //     //     ],
  //     //   },
  //     // ],
  //   },
  //   {
  //     category: "Grill",
  //     image: `${image1}`,
  //     items: [
  //       {
  //         id: 5,
  //         title: "Grilled Tilapia Fish",
  //         image: `${fish1}`,
  //         price: 1500,
  //       },
  //       {
  //         id: 61,
  //         title: "Chicken Suya",
  //         image: `${fish2}`,
  //         price: 5000,
  //       },
  //       {
  //         id: 62,
  //         title: "Beef Suya",
  //         image: `${fish3}`,

  //         price: 5000,
  //       },
  //       {
  //         id: 63,
  //         title: "Grilled Catfish",
  //         image: `${fish4}`,

  //         price: 5000,
  //       },
  //       {
  //         id: 64,
  //         title: "Grilled Plantain (Bole)",
  //         image: `${fish5}`,

  //         price: 5000,
  //       },
  //     ],
  //   },
  //   {
  //     category: "Drink",
  //     image: `${image2}`,
  //     items: [
  //       {
  //         id: 7,
  //         title: "Chapman",
  //         image: `${Chapman}`,
  //         price: "1250",
  //         details: "Chilled Drink",
  //         // options: [
  //         //   {
  //         //     label: "Add egg Sauce (+#500)",
  //         //     value: "eggSauce",
  //         //     price: "500",
  //         //   },
  //         //   {
  //         //     label: "Add More Pepper (+#1000)",
  //         //     value: "morePepper",
  //         //     price: "1000",
  //         //   },
  //         // ],
  //       },
  //       {
  //         id: 8,
  //         title: "Orange Juice",
  //         image: `${orangeJuice}`,
  //         price: "1250",
  //         details: "Fresh Orange Juice",
  //         // options: [
  //         //   {
  //         //     label: "Add egg Sauce (+#500)",
  //         //     value: "eggSauce",
  //         //     price: "500",
  //         //   },
  //         //   {
  //         //     label: "Add More Pepper (+#1000)",
  //         //     value: "morePepper",
  //         //     price: "1000",
  //         //   },
  //         // ],
  //       },
  //       {
  //         id: 81,
  //         title: "Cocktail",
  //         image: `${cocktail}`,
  //         price: "1250",
  //         details: "French Cocktail",
  //         // options: [
  //         //   {
  //         //     label: "Add egg Sauce (+#500)",
  //         //     value: "eggSauce",
  //         //     price: "500",
  //         //   },
  //         //   {
  //         //     label: "Add More Pepper (+#1000)",
  //         //     value: "morePepper",
  //         //     price: "1000",
  //         //   },
  //         // ],
  //       },
  //       {
  //         id: 82,
  //         title: "Fruit Punch",
  //         image: `${fruitPunch}`,
  //         price: "1250",
  //         details: "Fruit Punch",
  //         // options: [
  //         //   {
  //         //     label: "Add egg Sauce (+#500)",
  //         //     value: "eggSauce",
  //         //     price: "500",
  //         //   },
  //         //   {
  //         //     label: "Add More Pepper (+#1000)",
  //         //     value: "morePepper",
  //         //     price: "1000",
  //         //   },
  //         // ],
  //       },
  //       {
  //         id: 83,
  //         title: "Water",
  //         image: `${water}`,
  //         price: "1250",
  //         details: "Water",
  //         // options: [
  //         //   {
  //         //     label: "Add egg Sauce (+#500)",
  //         //     value: "eggSauce",
  //         //     price: "500",
  //         //   },
  //         //   {
  //         //     label: "Add More Pepper (+#1000)",
  //         //     value: "morePepper",
  //         //     price: "1000",
  //         //   },
  //         // ],
  //       },
  //     ],
  //   },
  // ];
  useEffect(() => {
    const basketItemsString = sessionStorage.getItem("basketItems");
    if (basketItemsString) {
      const basketItems: BasketItem[] = JSON.parse(basketItemsString);
      const basketItemIds = basketItems.map((item: BasketItem) => item.id);
      setIds(basketItemIds);
    }
  }, []);

  // const price = sessionStorage.getItem("totalPrice");
  console.log("Selected Group:", selectedGroup);
  const [counts, setCounts] = useState<number>(0);

  useEffect(() => {
    const storedCount = sessionStorage.getItem("count");
    if (storedCount !== null) {
      setCounts(Number(storedCount));
    }
  }, []);

  const incrementCount = () => {
    const updatedCount = counts + 1;
    setCounts(updatedCount);
    sessionStorage.setItem("count", String(updatedCount));
  };

  const decrementCount = () => {
    const updatedCount = counts - 1;
    setCounts(updatedCount);
    sessionStorage.setItem("count", String(updatedCount));
  };

  // const handleAddToBasket = () => {
  //   console.log("Selected Item ID:", id);
  //   if (id) {
  //     sessionStorage.setItem("id", id);
  //   }
  //   console.log("Selected Options:");
  //   selectedOptions.forEach((option) => {
  //     const selectedOption = options.find((opt) => opt.value === option);
  //     if (selectedOption) {
  //       console.log(selectedOption.label + " - Price: " + selectedOption.price);
  //     }
  //   });
  // };

  return (
    <div className=" relative ">
      <div className="  ">
        <TopMenuNav />

        <div className="mt-[24px] mb-[8px] flex items-center gap-[8px] text-center overflow-x-auto whitespace-nowrap">
          {menuGroup.map((menu) => (
            <div key={menu._id}>
              {menu.menu_category_name === id && (
                <div className="flex items-center">
                  <p
                    className={`px-[12px] py-[8px] inline-block ${
                      selectedGroup === menu.name
                        ? "bg-[#0B7F7C] text-white font-[600]"
                        : "border text-[#606060] font-[400]"
                    } text-[14px] cursor-pointer`}
                    onClick={() => setSelectedGroup(menu.name)}
                  >
                    {menu.name}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className=" mx-[24px]">
          <p className="text-[18px] font-[500] uppercase py-[9px] border-b ">
            {selectedGroup}
          </p>
          {menuItems.map((menu) => (
            <div key={menu._id} className={``}>
              {menu.menu_group_name === selectedGroup && (
                <>
                  <div className="">
                    <div
                      className=" py-[11px] border-b border-[#E7E7E7] "
                      key={menu._id}
                    >
                      <div className="flex items-center justify-between">
                        <div className=" w-[180px]">
                          <p className=" text-[16px] text-[#121212] font-[500]">
                            {menu.menu_item_name}
                          </p>
                          <p className=" text-[12px] text-[#121212]">
                            {/* {menu.details} */}
                          </p>
                        </div>

                        <div className="">
                          <Link to={`/menu-details/${menu._id}`}>
                            <img
                              src={menu.menu_item_image}
                              alt=""
                              className=" h-[80px] w-[80px] object-cover"
                            />
                          </Link>
                        </div>
                      </div>

                      <div className="pt-[8px] flex items-center justify-between">
                        <p className=" text-[16px] text-[#121212] font-[500] ">
                          From &#x20A6;{menu.menu_item_price}
                        </p>

                        <div className="w-[100px]">
                          {ids?.includes(menu._id.toString()) ? (
                            <div className=" flex items-center justify-between">
                              <img
                                src={Minus}
                                alt=""
                                onClick={decrementCount}
                                className=" cursor-pointer"
                              />
                              <p className=" text-[16px] font-[500]">
                                {counts}
                              </p>
                              <img
                                src={Add}
                                alt=""
                                onClick={incrementCount}
                                className=" cursor-pointer"
                              />
                            </div>
                          ) : (
                            <div className="">
                              <Link to={`/menu-details/${menu._id}`}>
                                <div className=" flex items-center justify-end">
                                  <img src={Add} alt="" />
                                </div>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        {/* {ids && (
          <div className="px-[16px] sticky bottom-[10px] w-full">
            <div className="flex justify-between items-center py-[13px] px-[24px] bg-[#EFB519] rounded-[3px] cursor-pointer">
              <div className="flex items-center gap-[16px]">
                <p className="bg-white py-[12px] px-[10px] text-[16px] font-[500]">
                  {counts || 1}
                </p>
                <p>#{price}</p>
              </div>
              <p className="text-[16px] font-[500]">Add to basket</p>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};
