// Body.js
import React, { useState } from "react";
import styles from "./TillBody.module.css";
import ModalComponent from "./common/ModalComponent";

const Body = ({ selectedItem }: any) => {
  const [open, setOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState<number | null>(null);

  console.log("====================================");
  console.log("selectedItem", selectedItem);
  console.log("====================================");

  // Create an array of random numbers with at least two zeros
  const guests = Array.from({ length: selectedItem?.num }, (_, i) =>
    i < 2 ? 0 : Math.floor(Math.random() * 6)
  );

  const handleOpen = (boxNumber: number) => {
    setSelectedBox(boxNumber);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.body}>
      {selectedItem ? (
        <div>
          <h2>{selectedItem.title}</h2>
          <h2>Available Tables</h2>
          <div className={styles.gridContainer}>
            {guests.map((guest, i) => (
              <div
                key={i}
                className={styles.gridItem}
                onClick={guest === 0 ? () => handleOpen(i + 1) : undefined}
              >
                Box {i + 1}: {guest} guest{guest !== 1 ? "s" : ""}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Please select an item from the sidebar</p>
      )}

      <ModalComponent open={open} handleClose={handleClose}>
        <h2>Enter number of guests for Box {selectedBox}</h2>
        <input type="number" min="0" />
      </ModalComponent>
    </div>
  );
};

export default Body;
