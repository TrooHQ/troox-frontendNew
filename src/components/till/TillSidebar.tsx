import React, { useState, useEffect } from "react";
import KantaLogo from "../../assets/trooLogo1.svg";
import styles from "./TillSidebar.module.css";
import MenuLink from "./MenuLink";
import ToggleButton from "./ToggleButton";
import UserInformation from "./UserInformation";
import { Link } from "react-router-dom";

const TillSidebar = ({ menuItems, onItemClick }: any) => {
  useEffect(() => {
    // Simulate fetching categories from backend
    // Replace this with your actual API call
    // Assuming menuItems is fetched from the backend
    // const fetchedMenuItems = [
    //   {
    //     id: 1,
    //     title: "Electronics",
    //     link: "/till/Electronics",
    //   },
    //   {
    //     id: 2,
    //     title: "Garments",
    //     link: "/till/garments",
    //   },
    //   {
    //     id: 3,
    //     title: "Toiletries",
    //     link: "/till/toiletries",
    //   },
    //   {
    //     id: 4,
    //     title: "Tools",
    //     link: "/till/tools",
    //   },
    // ];
  }, []);

  const storeName = "God is Good Stores";

  return (
    <div className={styles.sidebar}>
      <div>
        <Link to="/">
          <img src={KantaLogo} alt="" />
        </Link>
        <hr className="bg-[#E7E7E7] mb-2" />
        <div className={styles.storeName}>{storeName}</div>
        <hr className="bg-[#E7E7E7] mt-2" />

        <ul className={styles.list}>
          {menuItems.map((cat: any) => (
            <li key={cat.id} onClick={() => onItemClick(cat)}>
              <MenuLink item={cat} />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.bottom}>
        <hr className="bg-[#E7E7E7] mb-8" />
        <ToggleButton />
        <hr className="bg-[#E7E7E7] mt-8 mb-0" />

        <UserInformation />
      </div>
    </div>
  );
};

export default TillSidebar;
