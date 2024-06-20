// CRLayout.js
import React, { createContext, ReactNode, useState } from "react";
import styles from "../../../components/till/Till.module.css";
import TillSidebar from "../../../components/till/TillSidebar";
import SelectedCategoryContext from "../../../components/till/context/SelectedCategoryContext";

interface LayoutProps {
  children?: ReactNode;
}

const CRLayout = ({ children }: LayoutProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCategorySelect = (categoryId: any) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className={styles.container}>
      <SelectedCategoryContext.Provider value={selectedCategoryId}>
        <div className={styles.menu}>
          <TillSidebar onSelectCategory={handleCategorySelect} />
        </div>
        <div className={styles.content}>{children}</div>
      </SelectedCategoryContext.Provider>
    </div>
  );
};

export default CRLayout;
