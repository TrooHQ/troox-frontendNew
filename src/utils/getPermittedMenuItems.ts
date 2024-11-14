interface MenuItem {
  subTitle?: string;
  title?: string;
  gap?: boolean;
  Subgap?: boolean;
  icon?: string;
  subMenu?: MenuItem[];
  link?: string;
}

interface PermissionToMenuItem {
  [key: string]: string;
}

const permissionToMenuItem: PermissionToMenuItem = {
  // Define your permission to menu item mapping here
  // Example:
  "Accept or Decline Incoming Tickets on Waiter App": "Tickets",
  "Change Order Status on Waiter App": "Tickets",
  "Collect Tips on Waiter App": "Payment",
  "View Earnings from Tips": "Accounting",
  "Add Menus to Till": "Menu",
  "Add Modifiers to Till": "Menu",
  "Hold Orders on Till": "Tickets",
  "Work on Open Tickets on Till": "Tickets",
};

const getPermittedMenuItems = (menuItems: MenuItem[], permissions: string[]): MenuItem[] => {
  return menuItems.filter((menuItem) => {
    // If it's a top-level menu item with a title, check if permission exists
    if (menuItem.title) {
      const hasPermission = Object.keys(permissionToMenuItem).some(
        (permission) =>
          permissions.includes(permission) && permissionToMenuItem[permission] === menuItem.title
      );
      if (hasPermission) return true;
    }
    // Check submenus if they exist
    if (menuItem.subMenu) {
      menuItem.subMenu = menuItem.subMenu.filter((subItem) =>
        Object.keys(permissionToMenuItem).some(
          (permission) =>
            permissions.includes(permission) && permissionToMenuItem[permission] === subItem.title
        )
      );
      // If subMenu has items left after filtering, include the parent
      return menuItem.subMenu.length > 0;
    }
    // Return true for other types of items, such as titles or subtitles without `title`
    return menuItem.title == null;
  });
};

export default getPermittedMenuItems;
