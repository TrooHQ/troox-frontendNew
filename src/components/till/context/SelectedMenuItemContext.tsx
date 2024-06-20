// SelectedMenuItemContext.tsx
import React from "react";

export const SelectedMenuItemContext = React.createContext({
  selectedMenuItem: "",
  setSelectedMenuItem: (menuItem: string) => {
    console.log(menuItem);
  },
});
