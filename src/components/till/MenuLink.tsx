"use client";
import { Link, useLocation } from "react-router-dom";
import styles from "./MenuLink.module.css";

interface Item {
  path: string;
  title: string;
  num: number | string;
}

interface MenuLinkProps {
  item: Item;
}

const MenuLink = ({ item }: MenuLinkProps) => {
  const location = useLocation();

  return (
    <div
      className={`${styles.container} ${location.pathname === item.path ? styles.active : ""} ${
        item.title === "Electronics" && styles.electronics
      }`}
    >
      <span>{item.title}</span>
      <p>{`${item.num} tables`}</p>
    </div>
  );
};

export default MenuLink;
